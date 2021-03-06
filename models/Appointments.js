const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  meetingId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  startTime: {
    type: Date,
    require: true,
  },
  endTime: {
    type: Date,
    require: true,
  },
  timezone: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Appointments", AppointmentSchema);
