const Users = require("../models/User");
const mongoose = require("mongoose");
const {
  validateUniqueUrl,
  validateUserInfo,
} = require("../uitl/validateUserController");

// Checks if url is unique amongst other users
exports.checkUniqueUrl = async function (req, res) {
  // Task check url is unique in db

  const url = req.query.calendarUrl;

  const { isValid, message } = await validateUniqueUrl(url);
  if (!isValid) {
    return res.status(400).json({ massage: message });
  }

  return res.status(200).json({ massage: message });
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
