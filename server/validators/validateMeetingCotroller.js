const mongoose = require("mongoose");
const Meetings = require("../models/Meetings");

exports.validateCreateNewMeetingReq = async function (req) {
  // init
  let isValid = false;
  let existUser = false;
  let message = "";
  const userId = req.body.id;

  // Check that id is valid
  const idIsValid = await mongoose.isValidObjectId(userId);

  if (!idIsValid) {
    isValid = false;
    message = "userId is invalid";

    return { isValid, existUser, message };
  }

  // Check that duration is not empty
  if (!req.body.duration) {
    isValid = false;
    message = "duration shouldn't be an empty";
    return { isValid, existUser, message };
  }

  // Check that meetingId is not empty
  if (!req.body.meetingId) {
    isValid = false;
    message = "meetingId shouldn't be an empty";
    return { isValid, existUser, message };
  }

  // Check that user has another meeting
  const user = await Meetings.findById(userId);

  if (!user) {
    existUser = false;
    message = "";
    return { isValid, existUser, message };
  }

  isValid = true;
  existUser = true;

  return { isValid, existUser, message };
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
