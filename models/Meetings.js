const mongoose = require("mongoose");

const MeetingSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  appointment: { 
    type: Array 
  },
  eventURL: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Meetings", MeetingSchema);
