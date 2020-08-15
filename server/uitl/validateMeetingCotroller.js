const mongoose = require("mongoose");
const Meetings = require("../models/Meetings");

exports.validateCreateNewMeetingReq = async function (req) {
  // init
  let isValid = false;
  let existUserAndMeeting = false;
  let message = "";
  const userId = req.body.id;
  const meetingId = req.body.meetingId;

  // Check that id is valid
  const idIsValid = await mongoose.isValidObjectId(userId);

  if (!idIsValid) {
    isValid = false;
    message = "userId is invalid";

    return { isValid, message, existUserAndMeeting };
  }

  // Check that duration is not empty
  if (!req.body.duration) {
    isValid = false;
    message = "duration shouldn't be an empty";
    return { isValid, message, existUserAndMeeting };
  }

  // Check that meetingId is not empty
  if (!meetingId) {
    isValid = false;
    message = "meetingId shouldn't be an empty";
    return { isValid, message, existUserAndMeeting };
  }

  // Check that appointmentId is not empty
  if (!req.body.appointmentId) {
    isValid = false;
    message = "appointmentId shouldn't be an empty";
    return { isValid, message, existUserAndMeeting };
  }

  // Check that user and meetings are existing
  const user = await Meetings.find({
    _id: mongoose.Types.ObjectId(userId),
    "duration.meetingId": meetingId,
  });

  if (user.length == 0) {
    existUserAndMeeting = false;
    isValid = true;
    message = "";
    return { isValid, message, existUserAndMeeting };
  }

  isValid = true;
  existUserAndMeeting = true;

  return { isValid, message, existUserAndMeeting };
};

exports.validateLogedInUserId = async function (req) {
  // init
  let isValid = false;
  let message = "";
  const userId = req.body.id;

  // Check that id is valid
  const idIsValid = await mongoose.isValidObjectId(userId);

  if (!idIsValid) {
    isValid = false;
    message = "userId is invalid";

    return { isValid, message };
  }
  isValid = true;

  return { isValid, message };
};
