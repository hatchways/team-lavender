const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  // =====================================
  //  retrieved from google login response
  // =====================================
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
      unique: true
    },
    avatarUrl:{
      type:String,
      required:true
    },
    // =====================================
    //created by user during onboarding
    // =====================================
    timeZone: {
      type: String,
      enum: [
        "UTC-3 ADT",
        "UTC-4 EDT",
        "UTC-5 CDT",
        "UTC-6 MDT",
        "UTC-7 PDT"
      ],
      required: true,
    },
    //not decided on available hour yet
    availableHours: {
      type: String,
      default:"9:00,17:00",
      required:true
    },
    availableDays:{
      type:[string],
      required:true,
      default:["Mondays","Tuesdays","Wednesdays","Thursdays","Fridays"]
    },

    // =====================================
    //calendy Link : can be created by the method provided below
    // =====================================
    calendarUrl:{
      type:"string",
      required:true
    }

  }
);

userSchema.methods.createUrl = function() {
  // not sure why calendy replaced "." with "-", but doing the same for now
  // eg: mila.windsor@gmail.com  => url: https://calendly.com/mila-windsor
  return "http://localhost:3000/" + this.email.split("@")[0].replace(".","-")
};
const User = mongoose.model("User", userSchema);

module.exports = User;