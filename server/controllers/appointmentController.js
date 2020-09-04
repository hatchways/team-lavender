const Appointments = require("../models/Appointments");
const Meetings = require("../models/Meetings");
const Users = require("../models/User");
const Email = require("../uitl/email/sendEmail");
const mongoose = require("mongoose");
const moment = require("moment");

exports.getLoggedInUserAppointments = async function (req, res) {
  try {
    var query = { meetingId: req.params.meetingId };
    const appointmentList = await Appointments.find(query);
    if (appointmentList.length < 1) {
      return res.status(404).json({ message: "Meeting Id not found" });
    }
    return res.status(200).json({ appointmentList: appointmentList });
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
};

exports.createAppointment = async function (req, res) {
  let isValid = true;
  let message = "";
  let name = req.body.name;
  let email = req.body.email;
  let calendarURL = req.body.calendarURL;
  let time = req.body.time;
  let eventURL = req.body.eventURL;
  let timezone;

  //Check if all fields are not empty
  let result = checkFieldNotEmpty(isValid, "name", name, message);
  result = checkFieldNotEmpty(result.isValid, "email", email, result.message);
  result = checkFieldNotEmpty(
    result.isValid,
    "calendarURL",
    calendarURL,
    result.message
  );
  result = checkFieldNotEmpty(result.isValid, "time", time, result.message);
  result = checkFieldNotEmpty(
    result.isValid,
    "eventURL",
    eventURL,
    result.message
  );

  let user = await Users.find({ calendarUrl: calendarURL });
  if (user.length < 1) {
    return res
      .status(400)
      .json({ message: "creator's timezone doesn't exist" });
  }
  timezone = user[0].timeZone;

  isValid = result.isValid;
  message = result.message;

  // runs only when all fields are not empty
  if (isValid) {
    // get meeting id by eventURL
    let query = { eventURL: eventURL };
    const meeting = await Meetings.find(query);
    if (meeting.length < 1) {
      console.log("url doesnt exist");
      return res.status(400).json({ message: "eventURL doesn't exist" });
    }

    meetingId = meeting[0]._id;
    let duration = meeting[0].duration;
    // create an appointment
    const newAppointment = new Appointments({
      meetingId: meetingId,
      name: name,
      email: email,
      duration: duration,
      startTime: moment(time).toDate(),
      endTime: moment(time).add(duration, "m").toDate(),
      timezone: timezone,
    });
    query = { meetingId: meetingId };
    //Checks if meeting id is unique
    try {
      newAppointment.save(async function (err, appointment) {
        console.log("update meeting document");
        await Meetings.updateOne(
          {
            _id: mongoose.Types.ObjectId(meetingId),
          },
          {
            $push: {
              appointment: appointment.id,
            },
          }
        );
      });

      // send email to both users (meeting creator, appointment conformer)
      const emailTo = [email, user[0].email];
      Email.sendConfirmEmail("confirm", emailTo);
      console.log("appointment added");
    } catch (err) {
      return res.status(400).json({ massage: err });
    }

    return res.status(200).json({ massage: message });
  }
};

function checkFieldNotEmpty(isValid, fieldName, field, message) {
  if (!field) {
    isValid = false;
    message = `${fieldName} shouldn't be empty, Please make sure all field have a value.`;
    console.log(message);
    return { isValid, message };
  }

  return { isValid, message };
}
