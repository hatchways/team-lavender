const { google } = require("googleapis");
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);

// get google authentication
const oAuth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_uris
);
// load auth for getting tokens from google authentication code
const oauth2 = google.oauth2("v2");
// load calendar for getting events from google calendar
const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

module.exports = {
  authenticateUser: function (req, res) {
    oAuth2Client
      .getToken(req.query.code)
      .then(({ tokens }) => {
        oAuth2Client.setCredentials(tokens);
        return oauth2.userinfo.get({ access_token: tokens.access_token });
      })
      .then((userInfo) => {
        oAuth2Client.setCredentials({
          ...oAuth2Client.credentials,
          ...userInfo.data,
        });
        //TO DO: create user or update user with the user profile and new tokens
        return res.status(200).json(oAuth2Client.credentials);
      })
      .catch((err) => res.status(422).json(err));
  },

  getAvailability: function (req, res) {
    const date = `${req.query.year}-${req.query.month}-${req.query.date}`; // 2020-08-20
    const meetingLength = parseInt(req.params.meetingLength); // "30min" => 30
    //cheking if user is logged in
    console.log(oAuth2Client.credentials);

    //TO DO:get user available time from database, needs userController
    // Current: use default values
    const availableHoursFrom = "9:00";
    const availableHoursTo = "17:30";

    //create time availability range based on user availability preference
    const availabilityStart = moment(`${date} ${availableHoursFrom}`);
    const availabilityEnd = moment(`${date} ${availableHoursTo}`);
    const range = moment.range(availabilityStart, availabilityEnd);
    //slice the range by meetinglength into different slots
    const timeSlot = Array.from(range.by("minutes", { step: meetingLength }));

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
          return res.status(200).json(timeSlot.map((t) => t.format("HH:mm")));
        } else {
          return res.status(200).json(timeSlot.map((t) => t.format("HH:mm")));
        }
      })
      .catch((err) => {
        console.log("API request failed: ", err);
        return res.status(422).json(err);
      });
  },
};
