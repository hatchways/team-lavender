const { google } = require("googleapis");
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);

const Users = require("../models/User");
const mongoose = require("mongoose");

//======================================
//helper methods
//======================================
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

function getEvents(calendar, availabilityStart, availabilityEnd) {
  return calendar.events.list({
    calendarId: "primary",
    timeMin: availabilityStart.toISOString(),
    timeMax: availabilityEnd.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });
}

function findUserByUrl(calendarUrl) {
  return Users.findOne({ calendarUrl: calendarUrl });
}

function refreshUserToken(oAuth2Client, user) {
  oAuth2Client.setCredentials({ refresh_token: user.refreshToken });
  // refresh access token with oauth
  return oAuth2Client.refreshAccessToken().then((tokens) => {
    //update the access Token and expire date in the database, and return updated user
    return Users.findOneAndUpdate(
      { _id: user._id },
      {
        accessToken: tokens.credentials.access_token,
        expiryDate: tokens.credentials.expiry_date,
      },
      { new: true }
    );
  });
}

function createTimeSlot(availabilityStart, availabilityEnd, meetingLength) {
  const range = moment.range(availabilityStart, availabilityEnd);
  //slice the range by meetinglength into different slots
  let timeSlot = Array.from(range.by("minutes", { step: meetingLength }));
  timeSlot.pop();
  return timeSlot;
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
        //check if the meeting lasts till the next slot, if yes,increase the number os slots to remove
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

//======================================
//exportable methods
//======================================
let oAuth2Client = createConnection();
function authenticateUser(req, res) {
  let user = {};
  getTokenFromCode(oAuth2Client, req.query.code)
    .then(({ tokens }) => {
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
  const { timeZone, calendarUrl } = query;
  let user, availabilityStart, availabilityEnd;

  findUserByUrl(calendarUrl)
    .then(async (dbModel) => {
      //if user doesn't exist, break the chain, return response
      if (!dbModel) return res.status(404).json("User doesn't exist");
      else {
        user = dbModel;

        //check if the date is user's available day of a week
        const isAvailableDay = user.availableDays.includes(
          `${moment(date).format("dddd")}s`
        );
        if (!isAvailableDay)
          return res
            .status(404)
            .json("The date is not available for scheduling ");
        else {
          //check is access_token is expired and refresh if it is
          const isExpired = moment(parseInt(user.expiryDate)) < moment();
          if (isExpired) user = await refreshUserToken(oAuth2Client, user);

          //load google calendar library with valid access_token
          let calendar = getGoogleCalendarApi(oAuth2Client, {
            access_token: user.accessToken,
          });

          //get events from google calendar that scheduled within users available time range
          availabilityStart = moment(`${date} ${user.availableHoursFrom}`);
          availabilityEnd = moment(`${date} ${user.availableHoursTo}`);
          getEvents(calendar, availabilityStart, availabilityEnd).then(
            (response) => {
              const events = response.data.items;
              //split the user available hours by the meeting length
              timeSlot = createTimeSlot(
                availabilityStart,
                availabilityEnd,
                meetingLength
              );

              if (events.length)
                timeSlot = filterUnavailableSlot(events, timeSlot);
              return res
                .status(200)
                .json(timeSlot.map((t) => t.format("HH:mm")));
            }
          );
        }
      }
    })
    .catch((err) => {
      console.log("API request failed: ", err);
      return res.status(422).json(err);
    });
}

function addAppointment(req, res) {
  const {
    name,
    email,
    timeZone,
    calendarUrl,
  } = req.body;
  findUserByUrl("sharmadityaa")
    .then(async (dbModel) => {
      //if user doesn't exist, break the chain, return response
      if (!dbModel) return res.status(404).json("User doesn't exist");
      else {
        user = dbModel;
        const isExpired = moment(parseInt(user.expiryDate)) < moment();
        if (isExpired) user = await refreshUserToken(oAuth2Client, user);

        //load google calendar library with valid access_token
        let calendar = getGoogleCalendarApi(oAuth2Client, {
          access_token: user.accessToken,
        });
        var event = {
          summary: "calendapp appointment",
          location: "Online",
          description: "calendapp appointment",
          start: {
            dateTime: "2020-12-28T09:00:00-07:00",
            timeZone: "America/Los_Angeles",
          },
          end: {
            dateTime: "2020-12-28T17:00:00-07:00",
            timeZone: "America/Los_Angeles",
          },
          //recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
          attendees: [
            { email: "lpage@example.com" },
            { email: "sbrin@example.com" },
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
        };
        var request = calendar.events.insert({
          calendarId: "sharmadityaa@gmail.com",
          resource: event,
          //sendNotifications: true,
        });
        request.then(() => {
          return res.status(200).json("event added");
        });
        //request.execute(function (event) {
        //appendPre("Event created: " + event.htmlLink);
        //});
      }
    })
    .catch((err) => {
      console.log("API request failed: ", err);
      return res.status(422).json(err);
    });
}

module.exports = { authenticateUser, getAvailability, addAppointment };
