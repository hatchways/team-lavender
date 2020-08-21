const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const appointmentRouter = require("./routes/appointments");
const meetingsRouter = require("./routes/meetings");
const usersRouter = require("./routes/users");
const googleAPI = require("./routes/googleAPI");


// DB connection
const connectDB = require("./middleware/database");
// Start the DB
connectDB;


const { json, urlencoded } = express;

var app = express();
app.use(cors());


app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

//api routes
app.use("/appointments", appointmentRouter);
app.use("/meeting", meetingsRouter);
app.use("/user", usersRouter);
app.use("/api/google/", googleAPI);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
