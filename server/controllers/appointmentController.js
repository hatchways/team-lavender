const Appointments = require("../models/Appointments");
const mongoose = require("mongoose");

exports.getLoggedInUserAppointments = async function (req, res) {
  try {
    var query = { meetingId: "50" };
    const appointmentList = await Appointments.find(query);
    return res.status(200).json({ appointmentList: appointmentList });
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
};

var query = { meetingId: "50" };
const appointmentList = Appointments.find(query);
console.log(appointmentList);
