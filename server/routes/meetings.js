const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");

router.post("/", meetingController.createMeeting);

router.get("/", meetingController.getLoggedInUserMeetings);

router.post("/confirmemail", meetingController.sendConfirmEmail);


module.exports = router;
