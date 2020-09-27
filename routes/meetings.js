const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const gattedRoutes = require("../middleware/gattedRoutes");

router.post("/", gattedRoutes, meetingController.createMeeting);

router.get("/", gattedRoutes, meetingController.getLoggedInUserMeetings);

router.post("/confirmemail", meetingController.sendConfirmEmail);

router.post("/meetingcheck", meetingController.meetingCheck);

router.post("/getHostAvailableDay", meetingController.getHostAvailableDay);

module.exports = router;
