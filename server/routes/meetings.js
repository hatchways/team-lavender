const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");

router.post("/meeting", meetingController.createMeeting);

router.get("/meetings", meetingController.getLoggedInUserMeetings);

router.get("/meetings/confirmEmail", meetingController.sendConfirmEmail);


module.exports = router;
