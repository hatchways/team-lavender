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
  console.log(tokens);
  oAuth2Client.setCredentials(tokens);
  console.log(oAuth2Client.credentials);
  return google.calendar({ version: "v3", auth: oAuth2Client });
}

function getNewTokensFromRefreshToken() {
  console.log("here");
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
  //remove the last one from options, as it is the end of user availability time range
  timeSlot.pop();


  //get refresh_token from database
  let tokens = {
    access_token: 'ya29.a0AfH6SMAONkxgT08NCtjQzumVWsRx08QYFreyacRA94YNUDx6jI09QcuW0IqKeqCw6B1FKNRHJqzDiCL5djwe2OR9TYFTPogBvPzv47wWfDYmjt-oB9RhdtBuHyhUn2UNABPSbZsKzQ3EQuCfRkJaXrElAXomJiYro0U',
    refresh_token: '1//04KgH-NyTji37CgYIARAAGAQSNwF-L9Ira_HcF8o2spVVtcw3AMZr9yGWYzGSIF4k0VXBauzag8-ur_jqC5Jy4tPpykk6Dh8yafk',
    scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
    token_type: 'Bearer',
    id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZiYzYzZTlmMThkNTYxYjM0ZjU2NjhmODhhZTI3ZDQ4ODc2ZDgwNzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NzEzNzM5NjEyNjEtcmplajY1Zzk3ZGMzbzZqaXVmbHE2czJncDV2OXB0dXQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NzEzNzM5NjEyNjEtcmplajY1Zzk3ZGMzbzZqaXVmbHE2czJncDV2OXB0dXQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcxNTAxOTUwMjM4MzI4MjIyMTYiLCJlbWFpbCI6InJhaG1hbi5rZGRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJqd1J5SVdGWDh0NUFLS0t5b2dOMVJ3IiwibmFtZSI6IlJvbiBLYWRpZXJkaW5nIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoeGpMUTRXZU9lU2ZGNlU2UlR4MFZmVElGWEFoSFUzX2tiVENEWUdfVT1zOTYtYyIsImdpdmVuX25hbWUiOiJSb24iLCJmYW1pbHlfbmFtZSI6IkthZGllcmRpbmciLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU5ODA1NTI5MiwiZXhwIjoxNTk4MDU4ODkyfQ.D_0vvGJ8IqlDAoP92kRAlJ2uJK-i_bScG6GxaLSChQtmHsey1Q3TKWfU-2efRGkUHf1eBAfKsgvX4NtD8zlZ859rPwZMMm_psfr9AZ6b1V6m0fndlfaSQoiS_CRpJhTALlzECnft1CWPvMq_z-rZyCdhJRe6HnbpSVfN_IZC6JpwPSDisYDsMm08cDh9vbxbgo7mYS--lTTmFTaqs0v4VXA632YLVOE_H7YTGq2vrkeZ43ioZGOKziSeLWDRIC7Mz9sWf1tLFg8YEzWWjYADzIZTsCdF1x_5SQMuyBgyuHh3hzAhc_XG0g4xWQ8gPallRcaIvxhCMSQEJ4tQ1Ubt0g',
    expiry_date: 1598058890933
  };

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
