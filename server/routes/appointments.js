const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/appointment", appointmentController.createAppointment);

router.get("/appointments", appointmentController.getLoggedInUserAppointments);

module.exports = router;
