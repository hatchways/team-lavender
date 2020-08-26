import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimePicker from "./TimePicker";
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import API from "../utils/googleAPI";
import Create from "../utils/createAppointment"

const Calendar = (props) => {
    const classes = useStyles();
    const [availability, setAvailability] = React.useState(Object);
    const [pickedDate, setPickedDate] = React.useState();
    
    

    async function getAvailableTime(pickedDate) {
      const p = new Date(pickedDate);
      setPickedDate(p);
      let year = (p.getYear() + 1900).toString();
      let month = (p.getMonth() + 1).toString();
      let date = p.getDate().toString()

      const data = {
        year:year, // collected from the date user clicked on 
        month:month,
        date:date,
        availableFrom: "09:00",// from database 
        availableTo: "17:00",
        meetingLength: "30mins", //from the calendar type
        timezone: "America/Toronto", // use moment to get time zone
      };
      API.getAvailability(data).then((res) => {
        setAvailability(res)
      });
      
    }

    function confirmAppointment(clickedTime) {
      const data = {
        meetingId : "testMeetingId",
        name : "testName",
        email : "testEmail",
        time : pickedDate, // temporary value to pass a test for creating appointments
        time2 : clickedTime, // time clicked in the time list
        timezone: "America/Toronto"
      };
  
      Create.createAppointment(data)
    }

    return (
      <div className={classes.container}>
        <div className={classes.calendarWrapper}>
          <ReactCalendar
            className={classes.reactCalendar}
            tileDisabled={({date, view }) => 
            date.getMonth()=== 6 || date.getMonth()=== 9}
            onChange={getAvailableTime}
          />
        </div>
        <div className={classes.timePickerWrapper}>
          <TimePicker availability={availability} confirmAppointment={confirmAppointment}/>
        </div>
      </div>
    );
};


const useStyles = makeStyles((theme) => ({
  container : {
    display : "flex",
    width : "100%",
    padding : "30px"
  },
  calendarWrapper : {
    position : "relative",
    width : "60%",
  },
  timePickerWrapper : {
    position : "relative",
    width : "40%",
  }, 
  reactCalendar : {
    border : "none",
    "& abbr": {
      textDecoration: "none",
      width: "36px",
      height: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& *" : {
      fontSize : "15px",
      "font-weight" : "bold"
    }
  }
}));
  
export default Calendar;