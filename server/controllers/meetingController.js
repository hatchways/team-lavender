const Meetings = require("../models/Meetings");
const Users = require("../models/User");
const mongoose = require("mongoose");
const sendEmail = require("../uitl/email/sendEmail")
const {
  validateCreateNewMeetingReq,
  validateLogedInUserId,
} = require("../uitl/validateMeetingCotroller");

exports.createMeeting = async function (req, res) {
  // Validate a request
  const {
    isValid,
    message,
  } = await validateCreateNewMeetingReq(req);

  if (!isValid) {
    return res.status(400).json({ massage: message });
  }
  
  
  const userId = req.body.userId;
  const eventURL = req.body.eventURL;
  const duration = req.body.duration;
  const meeting = await Meetings.find({eventURL : eventURL})
  if (meeting.length > 0) {
    return res.status(200).json({ message: "event url already exist", eventURLExist: true});
  }
  
  // Create new meeting for logged in user
  const newMeeting = new Meetings({
    userId : userId,
    duration: duration,
    eventURL: eventURL,
    appointment : new Array(),
  });


  try {
    newMeeting.save()
    return res.json("new meeting is added");
  } catch(err) {
    return res.status(400).json({ message: err });
  }
};

exports.getLoggedInUserMeetings = async function (req, res) {
  const { isValid, message } = await validateLogedInUserId(req);

  if (!isValid) {
    return res.status(400).json({ message: message });
  }

  // Get list of meetings
  try {
    const meetingList = await Meetings.findById(req.body.id);
    return res.status(200).json({ meetingList: meetingList });
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
};

exports.meetingCheck = async function (req, res) {
  let isValid = true;
  let message = "";
  let duration = 0;
  let hostName = ""; 

  const calendarURL = req.body.calendarURL;
  const eventURL = req.body.eventURL;
  let result = checkFieldNotEmpty(isValid, "calendarURL", calendarURL, message);
  result = checkFieldNotEmpty(result.isValid, "eventURL", eventURL, result.message);
  
  if (!isValid) {
    return res.status(200).json({message : "not valid url", isExist : false})
  }
  
  const user = await Users.find({calendarUrl : calendarURL});
  if (user.length < 1) {
    console.log("calendarURL doesnt exist")
    return res.status(200).json({message : "calendarURL doesn't exist", isExist : false})
  }
  hostName = user[0].name;


  const meeting = await Meetings.find({eventURL : eventURL});
  if (meeting.length < 1) {
    console.log("eventURL doesnt exist")
    return res.status(200).json({message : "eventURL doesn't exist", isExist : false})
  }
  duration = meeting[0].duration
  
  // // this comment will be uncommented after FE pass the proper userID when creating a meeintg
  // if (user[0]._id != meeting[0].userId) {
  //   console.log("eventURL and calendarURL don't match")
  //   return res.status(200).json({message : "eventURL and calendarURL don't match", isExist : false})
  // }


  return res.status(200).json({message : "eventURL doesn't exist", isExist : true, duration : duration, hostName : hostName}) 
}

exports.getHostAvailableDay = async function (req, res) {
  const calendarURL = req.body.calendarURL;
  let isValid = true;
  let message = "";

  checkFieldNotEmpty(isValid, "calendarURL", calendarURL, message);

  if (!isValid) {
    return res.status(200).json({message : "not valid url", isExist : false})
  }
  const user = await Users.find({calendarUrl : calendarURL});
  let hostAvailableDay = user[0].availableDays;

  // 0 : sunday, 1 : monday, 2 : tueseday ...
  let hostAvailableDayByNumber = [0,1,2,3,4,5,6];
  hostAvailableDay.forEach((element) => {
    switch(element) {
      case "Sundays":
        hostAvailableDayByNumber.splice(hostAvailableDayByNumber.indexOf(0), 1);
        break;
      case "Mondays":
        hostAvailableDayByNumber.splice(hostAvailableDayByNumber.indexOf(1), 1);
        break;
      case "Tuesdays":
        hostAvailableDayByNumber.splice(hostAvailableDayByNumber.indexOf(2), 1);
        break;
      case "Wednesdays":
        hostAvailableDayByNumber.splice(hostAvailableDayByNumber.indexOf(3), 1);
        break;
      case "Thursdays":
        hostAvailableDayByNumber.splice(hostAvailableDayByNumber.indexOf(4), 1);
        break;
      case "Fridays":
        hostAvailableDayByNumber.splice(hostAvailableDayByNumber.indexOf(5), 1);
        break;
      case "Saturdays":
        hostAvailableDayByNumber.splice(hostAvailableDayByNumber.indexOf(6), 1);
        break;
    }
  })
  return res.status(200).json({message : "eventURL doesn't exist", hostAvailableDay : hostAvailableDayByNumber}) 
}

exports.sendConfirmEmail = function (req,res) {
  ///////////// test code //////////////
  ///// Use email in this way below ////
  const emailType = sendEmail.EMAIL_TYPE.CONFIRM_EMAIL // set email type between "CONFIRM_EMAIL" and "WELCOME_EMAIL"
  const emailInfo = [{
    sendTo : "benjaminlee.kr@gmail.com", // Who you are sending to
  }]
  sendEmail.sendConfirmEmail(emailType, emailInfo);
  /////////////////////
}

function checkFieldNotEmpty(isValid, fieldName, field, message) {
  if (!field) {
    isValid = false;
    message = `${fieldName} shouldn't be empty, Please make sure all field have a value.`;
    console.log(message)
    return { isValid, message };
  }
  return { isValid, message };
}