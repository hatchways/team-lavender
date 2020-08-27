const mongoose = require("mongoose");
const db = require("../models/User");

const connectDB = require("../middleware/database");
connectDB;

const userSeed = [
  {
    name: "Mila Test1",
    email: "mila.test1@gmail.com",
    avatarUrl: "https://avatars2.githubusercontent.com/u/59339564?v=4",

    timeZone: "America/Toronto",
    availableHoursFrom: "9:00",
    availableHoursTo: "17:00",
    availableDays: [
      "Mondays",
      "Tuesdays",
      "Wednesdays",
      "Thursdays",
      "Fridays",
    ],
    calendarUrl: "/mila-test1"
  },
  {
    name: "Mila Test2",
    email: "mila.test2@gmail.com",
    avatarUrl: "https://avatars2.githubusercontent.com/u/59339564?v=4",

    timeZone: "America/Toronto",
    availableHoursFrom: "9:00",
    availableHoursTo: "17:00",
    availableDays: [
      "Mondays",
      "Tuesdays",
      "Wednesdays",
      "Thursdays",
      "Fridays",
    ],
    calendarUrl: "/mila-test2"
  },
];

db.insertMany(userSeed)
  .then(() => {
    console.log(userSeed.length + " User records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
