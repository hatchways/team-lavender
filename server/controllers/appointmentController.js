const Appointments = require("../models/Appointments");
const mongoose = require("mongoose");

exports.getLoggedInUserAppointments = async function (req, res) {
  try {
    var query = { meetingId: req.params.meetingId };
    const appointmentList = await Appointments.find(query);
    if (appointmentList.length < 1) {
      return res.status(404).json({ message: "Meeting Id not found" });
    }
    return res.status(200).json({ appointmentList: appointmentList });
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
};

exports.createAppointment = async function (req, res) {
  let isValid = true;
  let message = "";
  const { meetingId, name, email, startTime, endTime, timezone } = req.body;

  //Check if all fields are not empty
  let result = checkFieldNotEmpty(isValid, "meetingId", meetingId, message);
  result = checkFieldNotEmpty(result.isValid, "name", name, result.message);
  result = checkFieldNotEmpty(result.isValid, "email", email, result.message);
  result = checkFieldNotEmpty(
    result.isValid,
    "startTime",
    startTime,
    result.message
  );
  result = checkFieldNotEmpty(
    result.isValid,
    "endTime",
    endTime,
    result.message
  );
  result = checkFieldNotEmpty(
    result.isValid,
    "timezone",
    timezone,
    result.message
  );
  isValid = result.isValid;
  message = result.message;
  // runs only when all fields are not empty
  if (isValid) {
    const newAppointment = new Appointments({
      meetingId,
      name,
      email,
      startTime: Date.parse(startTime),
      endTime: Date.parse(endTime),
      timezone,
    });
    try {
      newAppointment.save();
      return res.json("Appointment added");
    } catch (err) {
      return res.status(400).json({ massage: err });
    }
  }
  // Only runs if a field is empty and returns message `${fieldName} shouldn't be empty, Please make sure all field have a value.`
  return res.status(400).json({ massage: message });
};

function checkFieldNotEmpty(isValid, fieldName, field, message) {
  if (!field) {
    isValid = false;
    message = `${fieldName} shouldn't be empty, Please make sure all field have a value.`;
    return { isValid, message };
  }
  return { isValid, message };
}
