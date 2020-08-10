const mongoose = require("mongoose");

const MeetingSchema = mongoose.Schema({
  duration: {
    type: Integer,
    require: true,
  },
});

module.exports = mongoose.model("Meetings", MeetingSchema);
