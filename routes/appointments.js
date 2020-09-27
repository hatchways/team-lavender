const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const gatedRoute = require("../middleware/gattedRoutes");

router.post("/add", appointmentController.createAppointment);

//not sure where its used
router.get(
  "/:meetingId",
  gatedRoute,
  appointmentController.getLoggedInUserAppointments
);

module.exports = router;
