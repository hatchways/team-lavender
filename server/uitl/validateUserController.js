const Users = require("../models/User");

exports.validateUniqueUrl = async function (req) {
  // init
  let isValid = false;
  let message = "";
  let id = "";

  // Check that url is unique
  urls = await Users.find({ calendarUrl: req });
  console.log(urls);
  console.log(urls[0]["_id"]);
  id = urls[0]["_id"];

  if (urls.length > 0) {
    message = "this url is not unique";
    return { isValid, message, id };
  }

  isValid = true;
  message = "this url is unique";
  return { isValid, message };
};

exports.validateUserInfo = async function (req) {
  //init
  let isValid = false;
  let message = "";
  const {
    timeZone,
    availableHoursFrom,
    availableHoursTo,
    availableDays,
    calendarUrl,
    accessToken,
    expiryDate,
  } = req.body;

  // Check that timeZone is not null
  if (!timeZone) {
    isValid = false;
    message = "timeZone shouldn't be an empty";
    return { isValid, message };
  }
  // Check that availableHoursFrom is not null
  if (!availableHoursFrom) {
    isValid = false;
    message = "availableHoursFrom shouldn't be an empty";
    return { isValid, message };
  }
  // Check that availableHoursTo is not null
  if (!availableHoursTo) {
    isValid = false;
    message = "availableHoursTo shouldn't be an empty";
    return { isValid, message };
  }
  // Check that availableDays is not null
  if (!availableDays) {
    isValid = false;
    message = "availableDays shouldn't be an empty";
    return { isValid, message };
  }
  // Check that calendarUrl is not null
  if (!calendarUrl) {
    isValid = false;
    message = "calendarUrl shouldn't be an empty";
    return { isValid, message };
  }
  // Check that accessToken is not null
  if (!accessToken) {
    isValid = false;
    message = "accessToken not recieved";
    return { isValid, message };
  }
  // Check that expiryDate is not null
  if (!expiryDate) {
    isValid = false;
    message = "expiryDate not recieved";
    return { isValid, message };
  }
  // Check that url is unique
  userIdandUrl = await Users.find({ _id: req.params.id }, { calendarUrl: 1 });
  url = userIdandUrl[0]["calendarUrl"];

  if (calendarUrl !== url) {
    urls = await Users.find({ calendarUrl: calendarUrl });
    console.log(urls);
    if (urls.length > 0) {
      message = "this url is not unique";
      return { isValid, message };
    }
  }

  isValid = true;
  return { isValid, message };
};
