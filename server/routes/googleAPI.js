const express = require("express");
const router = express.Router();
const controller = require("../controllers/googleApiController")

router.get("/authentication", controller.authenticateUser)

router.get("/:meetingLength/availability",controller.getAvailability)


module.exports = router;
