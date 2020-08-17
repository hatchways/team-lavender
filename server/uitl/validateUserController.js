const Users = require("../models/User");

exports.validateUniqueUrl = async function (req) {
  // init
  let isValid = false;
  let message = "";

  // Check that url is unique
  urls = await Users.find({ calendarUrl: req });

  if (urls.length > 0) {
    message = "this url is not unique";
    return { isValid, message };
  }

  isValid = true;
  message = "this url is unique";
  return { isValid, message };
};

exports.validateUserInfo = async function (req) {
  //init
  let isValid = false;
  let message = "";
  const name = req.body.name;
  const avatarUrl = req.body.avatarUrl;
  const timeZone = req.body.timeZone;
  const availableHoursFrom = req.body.availableHoursFrom;
  const availableHoursTo = req.body.availableHoursTo;
  const availableDays = req.body.availableDays;
  const calendarUrl = req.body.calendarUrl;

  // Check that name is not null
  if (!name) {
    isValid = false;
    message = "name shouldn't be an empty";
    return { isValid, message };
  }
  // Check that is not null
  if (!avatarUrl) {
    isValid = false;
    message = "avatarUrl shouldn't be an empty";
    return { isValid, message };
  }
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
