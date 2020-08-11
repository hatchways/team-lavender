const Meetings = require("../models/Meetings");
const mongoose = require("mongoose");
const {
  validateCreateNewMeetingReq,
  validateLogedInUserId,
} = require("../validators/validateMeetingCotroller");

exports.createMeeting = async function (req, res) {
  // Validate a request
  const { isValid, existUser, message } = await validateCreateNewMeetingReq(
    req
  );

  if (!isValid) {
    return res.status(400).json({ massage: message });
  }

  const userId = req.body.id;
  newMeeting = { meetingId: req.body.meetingId, duration: req.body.duration };

  // Create new meeting
  if (!existUser) {
    const meeting = new Meetings({
      _id: userId,
      duration: newMeeting,
    });
    try {
      await meeting.save();
      return res.status(200).json({ massage: "new Meeting Created" });
    } catch (err) {
      return res.status(400).json({ massage: err });
    }
  }

  // Add a new meeting to an existing user
  try {
    Meetings.collection.updateOne(
      {
        _id: mongoose.Types.ObjectId(userId),
      },
      { $push: { duration: newMeeting } }
    );
    return res
      .status(200)
      .json({ massage: "new Meeting Created to exist user" });
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
};

exports.getLoggedInUserMeetings = async function (req, res) {
  const { isValid, message } = await validateLogedInUserId(req);

  if (!isValid) {
    return res.status(400).json({ massage: message });
  }

  // Get list of meetings
  try {
    const meetingList = await Meetings.findById(req.body.id);
    return res.status(200).json({ meetingList: meetingList });
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
};
