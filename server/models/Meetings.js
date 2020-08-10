const mongoose = require("mongoose");

const MeetingSchema = mongoose.Schema({
  duration: { type: Array, require: true },
});

module.exports = mongoose.model("Meetings", MeetingSchema);
