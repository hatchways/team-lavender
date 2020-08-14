const Meetings = require("../models/Meetings");
const mongoose = require("mongoose");
const {
  validateCreateNewMeetingReq,
  validateLogedInUserId,
} = require("../validators/validateMeetingCotroller");

exports.createMeeting = async function (req, res) {
  // Validate a request
  const {
    isValid,
    message,
    existUserAndMeeting,
  } = await validateCreateNewMeetingReq(req);

  if (!isValid) {
    return res.status(400).json({ massage: message });
  }

  let condition = "";
  let updateData = "";
  const userId = req.body.id;

  // Create new meeting for logged in user
  if (!existUserAndMeeting) {
    condition = {
      _id: mongoose.Types.ObjectId(userId),
    };

    updateData = {
      duration: {
        meetingId: req.body.meetingId,
        duration: req.body.duration,
        appointment: [req.body.appointmentId],
      },
    };

    // Add new appointment to exist user's meeting schedule
  } else {
    condition = {
      _id: mongoose.Types.ObjectId(userId),
      "duration.meetingId": req.body.meetingId,
    };

    updateData = {
      "duration.$.appointment": req.body.appointmentId,
    };
  }

  // Create new meeting
  try {
    Meetings.collection.updateOne(
      condition,
      {
        $addToSet: updateData,
      },
      {
        upsert: true,
      }
    );
    return res.status(200).json({ massage: "new Meeting Created" });
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


exports.sendConfirmEmail = function (req, res) {

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'ANY EMAIL TO SEND',
    from: 'team.lavender.hatchway@gmail.com', // Use the email address or domain you verified by sendgrid
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'TEST EMAIL',
    html: '<strong>TEST EMAIL</strong>',
  };
  //ES6
  sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    });
  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
};