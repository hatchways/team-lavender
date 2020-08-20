const Users = require("../models/User");
const Meetings = require("../models/Meetings");
const mongoose = require("mongoose");
const {
  validateUniqueUrl,
  validateUserInfo,
} = require("../uitl/validateUserController");

// Checks if url is unique amongst other users
exports.checkUniqueUrl = async function (req, res) {
  // Task check url is unique in db

  const url = req.query.calendarUrl;
  console.log(url);

  const { isValid, message, id } = await validateUniqueUrl(url);
  if (!isValid) {
    return res.status(400).json({ message: message, id: id });
  }

  return res.status(200).json({ message: message });
};

// Update name, avaterUrl and timeZone
exports.updateUserInfo = async function (req, res) {
  userId = req.params.id;
  const { isValid, message } = await validateUserInfo(req);

  if (!isValid) {
    return res.status(400).json({ message: message });
  }

  try {
    // update
    Users.collection.updateOne(
      {
        _id: mongoose.Types.ObjectId(userId),
      },
      {
        $set: {
          name: req.body.name,
          avatarUrl: req.body.avatarUrl,
          timeZone: req.body.timeZone,
          availableHoursFrom: req.body.availableHoursFrom,
          availableHoursTo: req.body.availableHoursTo,
          availableDays: req.body.availableDays,
          calendarUrl: req.body.calendarUrl,
        },
      }
    );
    return res.status(200).json({ massage: "Update" });
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
};

// Update name, avaterUrl and timeZone
exports.signUpUser = async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const avatarUrl = req.body.avatarUrl;
  let userId = "";
  let calendarUrl = "";

  // Check user has account
  const existUser = await Users.find(
    { email: email },
    { email: 1, calendarUrl: 1 }
  );

  if (existUser.length > 0) {
    return res.status(200).json({
      message: "Already Exist User Account",
      _id: existUser[0]["_id"],
      calendarUrl: existUser[0]["calendarUrl"],
    });
  }

  try {
    // Create new User
    const user = new Users({
      name: name,
      email: email,
      avatarUrl: avatarUrl,
      timeZone: "America/Toronto", // Default
      calendarUrl: "",
    });

    userId = user._id;
    user.calendarUrl = user.createUrl();
    calendarUrl = user.calendarUrl;
    console.log(calendarUrl);
    user.save();
  } catch (err) {
    return res.status(400).json({ massage: err });
  }

  // Create default meeting
  try {
    const meeting = new Meetings({
      duration: {
        duration: 60, // Default
        appointment: [],
      },
    });
    meeting.save();
  } catch (err) {
    return res.status(400).json({ massage: err });
  }

  return res.status(200).json({
    message: "Created new user",
    _id: userId,
    calendarUrl: calendarUrl,
  });
};
