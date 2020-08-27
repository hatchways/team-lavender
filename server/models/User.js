const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // =====================================
  //  retrieved from google login response
  // =====================================
  id: {
    type: String,
  },
  name: {
    type: String,
    minlength: 1,
    maxlength: 30,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 1,
    maxlength: 30,
    trim: true,
    required: true,
    unique: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  expireAt: {
    type: String,
  },

  // =====================================
  //created by user during onboarding
  // =====================================
  timeZone: {
    type: String,
    required: true,
  },
  availableHoursFrom: {
    type: String,
    default: "9:00",
    required: true,
  },
  availableHoursTo: {
    type: String,
    default: "17:00",
    required: true,
  },
  availableDays: {
    type: [String],
    required: true,
    default: ["Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays"],
  },

  // =====================================
  //calendy Link : can be created by the method provided below
  // =====================================
  calendarUrl: {
    type: String,
    required: true,
    unique: true,
  },
  subscriptionId: {
    type: String,
    required: true,
    default: "test",
  },
});

userSchema.methods.createUrl = function () {
  // not sure why calendy replaced "." with "-", but doing the same for now
  // eg: mila.windsor@gmail.com  => url: https://calendly.com/mila-windsor
  return "http://localhost:3000/" + this.email.split("@")[0].replace(".", "-");
};
const User = mongoose.model("User", userSchema);

module.exports = User;
