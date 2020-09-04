const mongoose = require("mongoose");
const Meetings = require("../models/Meetings");

exports.validateCreateNewMeetingReq = async function (req) {
  // init
  let isValid = false;
  let message = "Valid";
  let userId = req.body.userId;
  const eventURL = req.body.eventURL;
  const duration = req.body.duration;


  // Check that id is valid
  const idIsValid = await mongoose.isValidObjectId(userId);

  if (!idIsValid || !userId) {
    isValid = false;
    message = "userId is invalid";

    return { isValid, message };
  }

  // Check that duration is not empty
  if (!duration) {
    isValid = false;
    message = "duration shouldn't be an empty";
    return { isValid, message };
  }

  if (!eventURL) {
    isValid = false;
    message = "eventURL shouldn't be an empty";
    return { isValid, message };
  }

  isValid = true;

  return { isValid, message };
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
