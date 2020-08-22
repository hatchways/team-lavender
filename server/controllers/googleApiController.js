const { google } = require("googleapis");
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);

function createConnection() {
  return new google.auth.OAuth2(
    process.env.client_id,
    process.env.client_secret,
    process.env.redirect_uris
  );
}

function getTokenFromCode(oAuth2Client, code) {
  return oAuth2Client.getToken(code);
}

function getGoogleUserInfo(access_token) {
  const oauth2 = google.oauth2("v2");
  return oauth2.userinfo.get({ access_token });
}

function getGoogleCalendarApi(oAuth2Client, tokens) {
  oAuth2Client.setCredentials(tokens);
  return google.calendar({ version: "v3", auth: oAuth2Client });
}


function filterUnavailableSlot(events, timeSlot) {
  for (let event of events) {
    const startTime = moment(event.start.dateTime);
    const endTime = moment(event.end.dateTime);
    //number of slots that meeting will take up
    let n = 0;
    for (let i = 0; i < timeSlot.length; i++) {
      if (
        timeSlot[i].isSameOrBefore(startTime) &&
        timeSlot[i + 1].isAfter(startTime)
      ) {
        //check if the meeting lasts till the next slot, if yes,increse the number os slots to remove
        while (endTime.isAfter(timeSlot[i + n])) {
          n++;
        }
        timeSlot.splice(i, n);
        break;
      }
    }
  }
  return timeSlot;
}

function authenticateUser(req, res) {
  const oAuth2Client = createConnection();
  let user = {};
  getTokenFromCode(oAuth2Client, req.query.code)
    .then(({ tokens }) => {
      console.log(tokens);
      user.tokens = tokens;
      return getGoogleUserInfo(tokens.access_token);
    })
    .then((userInfo) => {
      user.userInfo = userInfo.data;
      res.status(200).json(user);
    })
    .catch((err) => res.status(422).json(err));
}

function getAvailability(req, res) {
  const { query } = req;
  const date = `${query.year}-${query.month}-${query.date}`; // 2020-08-20
  const meetingLength = parseInt(query.meetingLength); // "30min" => 30
  const { availableFrom, availableTo, timeZone } = query;

  //create time availability range based on user availability preference
  const availabilityStart = moment(`${date} ${availableFrom}`);
  const availabilityEnd = moment(`${date} ${availableTo}`);
  const range = moment.range(availabilityStart, availabilityEnd);

  //slice the range by meetinglength into different slots
  let timeSlot = Array.from(range.by("minutes", { step: meetingLength }));
  timeSlot.pop();


  //TO DO: ================================================
  //get refresh_token from database
  //=======================================================
  let tokens = {
    refresh_token: '1//04iEjINizE_ycCgYIARAAGAQSNwF-L9IrwqcMhXTfbv1LnyUdr8-cbJDPdF3A1-wNeBnpaHKOj7hI9y5WfOJBX5ZjwCwZToRN9Yw'
  };

  //create connection to google calendar, and retrieve events
  const oAuth2Client = createConnection();
  const calendar = getGoogleCalendarApi(oAuth2Client, tokens);
  calendar.events
    .list({
      calendarId: "primary",
      timeMin: availabilityStart.toISOString(),
      timeMax: availabilityEnd.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    })
    .then((response) => {
      const events = response.data.items;
      if (events.length) {
        timeSlot = filterUnavailableSlot(events, timeSlot);
      }
      return res.status(200).json(timeSlot.map((t) => t.format("HH:mm")));
    })
    .catch((err) => {
      console.log("API request failed: ", err);
      return res.status(422).json(err);
    });
}

module.exports = { authenticateUser, getAvailability };
