const { google } = require("googleapis");
const moment = require("moment");

// get google authentication
const oAuth2Client = new google.auth.OAuth2(
  process.env.client_id, process.env.client_secret, process.env.redirect_uris
);
// load auth for getting tokens from google authentication code
const oauth2 = google.oauth2("v2");
// load calendar for getting events from google calendar
const calendar = google.calendar({version: "v3",auth: oAuth2Client});

module.exports = {
  authenticateUser: function (req, res) {
    oAuth2Client
      .getToken(req.query.code)
      .then(({ tokens }) => {
        oAuth2Client.setCredentials(tokens);
        return oauth2.userinfo.get({access_token: tokens.access_token});
      })
      .then((userInfo) => {
        oAuth2Client.setCredentials({...oAuth2Client.credentials,...userInfo.data});
        //TO DO: create user or update user with the user profile and new tokens
        return res.status(200).json(oAuth2Client.credentials);
      })
      .catch((err) => res.status(422).json(err));
  },

  getAvailability: function (req, res) {
    console.log(oAuth2Client.credentials);
    let date = `${req.query.year}-${req.query.month}-${req.query.date}`;
    let meetingLength = req.params.meetingLength;

    //DONE: ==================================================
    // the meeting length (15,30,60mins), and specific date is received from client.
    // events for the date is retreived from google
    //TO DO:==================================================
    // calculate available slots based on the info above


    calendar.events
      .list({
        calendarId: "primary",
        timeMin: moment(date).toISOString(),
        timeMax: moment(date).add(1, "days").toISOString(),
        maxResults: 2,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.data.items;
        if (events.length) {
          //TO DO:get user available time from database
          // calculate available time slots based on events for the day
          return res.status(200).json(events);
        } else {
          //TO DO:return all time slots as available
          console.log("No upcoming events found startDate.");
        }
      })
      .catch((err) => {
        console.log("API request failed: ", err);
        return res.status(422).json(err);
      });
  },
};
