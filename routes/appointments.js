const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const gatedRoute = require("../middleware/gattedRoutes");

router.post("/add", appointmentController.createAppointment);

//TBD
router.get(
  "/:meetingId",
  gatedRoute,
  appointmentController.getLoggedInUserAppointments
);

module.exports = router;
