const express = require("express");
const router = express.Router();
const controller = require("../controllers/googleApiController");

router.get("/authentication", controller.authenticateUser);

router.get("/availability", controller.getAvailability);

router.post("/addAppointment", controller.addAppointment);

module.exports = router;
