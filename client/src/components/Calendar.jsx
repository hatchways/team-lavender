import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimePicker from "./TimePicker";
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = (props) => {
    const classes = useStyles();
    const [year, setYear] = React.useState("");
    const [month, setMonth] = React.useState(""); 
    const [date, setDate] = React.useState("");


    return (
      <div className={classes.container}>
        <div className={classes.calendarWrapper}>
          <ReactCalendar
            className={classes.reactCalendar}
            tileDisabled={({date, view }) => 
            date.getMonth()=== 7 || date.getMonth()=== 9}
            // onClickDay={(value, event) => alert('Clicked day: ', value)}
            // onClickMonth={(value, event) => alert('Clicked month: ', value)}
            // onClickYear={(value, event) => alert('Clicked year: ', value)}
          />
        </div>
        <div className={classes.timePickerWrapper}>
          <TimePicker />
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