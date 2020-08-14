const Appointments = require("../models/Appointments");
const mongoose = require("mongoose");

exports.getLoggedInUserAppointments = async function (req, res) {
  try {
    var query =  {meetingId: req.param.meetingId} ;
    const appointmentList = await Appointments.find(query);
    return res.status(200).json({ appointmentList: appointmentList });
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
};

exports.createAppointment = async function (req, res) {

  const newAppointment = new Appointments ( {
      meetingId: req.body.meetingId,
      name: req.body.name,
      email: req.body.email,
      time: Date.parse(req.body.time),
      timezone: req.body.timezone,
    });
    try {
      newAppointment.save()
      return res.json("Appointment added");
    } catch (err) {
      return res.status(400).json({ massage: err });
    }