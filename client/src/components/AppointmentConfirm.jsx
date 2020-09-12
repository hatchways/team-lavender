import React, { useEffect } from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MeetingConfirm from "./MeetingConfirm";
import Create from "../utils/createAppointment";

function AppointmentConfirm(props) {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const [hostName, setHostName] = React.useState("");
  const [time, setTime] = React.useState("");
  const [timeZone, setTimeZone] = React.useState();
  useEffect(() => {
    setTime(urlParams.get("time"));
  }, []);

  function confirmAppointment(name, email, calendarURL) {
    const time = `${urlParams.get("date")}T${urlParams.get("time")}`;
    const data = {
      name: name,
      email: email,
      calendarURL: calendarURL,
      time: time,
      eventURL: urlParams.get("eventURL"),
    };

    const res = Create.createAppointment(data);
    console.log(res);
    alert("Appointment is confirmed ");
  }
  return (
    <div>
      <div className={classes.title}>
        <div style={{ color: "#F78104" }}>calend</div>App
      </div>
      <div className={classes.scheduleCalendarContainer}>
        <div className={classes.onTheLeftOfDivider}>
          <div className={classes.duration}>
            <AccessTimeIcon />
            <div>30 min</div>
          </div>
          <div>Start at {time}</div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={classes.onTheRightOfDivider}>
          <MeetingConfirm
            confirmAppointment={confirmAppointment}
            setHostName={setHostName}
          ></MeetingConfirm>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  scheduleCalendarContainer: {
    display: "flex",
    margin: "auto",
    width: "1000px",
    height: "480px",
    boxShadow: "1px 1px 10px 3px rgba(196,196,196,1)",
    font: "Arial, Helvetica, sans-serif",
    fontWeight: "bold",
    "text-align": "center",
  },
  title: {
    display: "flex",
    fontSize: "20px",
    fontWeight: "bold",
    justifyContent: "center",
    margin: "50px",
  },
  onTheLeftOfDivider: {
    position: "relative",
    width: "25%",
    "& *": {
      fontSize: "20px",
      "margin-top": "20px",
      "margin-bottom": "20px",
    },
  },
  onTheRightOfDivider: {
    position: "relative",
    width: "75%",
    display: "flex",
  },
  duration: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default AppointmentConfirm;
