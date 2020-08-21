import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimePicker from "./TimePicker";
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = (props) => {
    const classes = useStyles();


    return (
      <React.Fragment>
        <div className={classes.container}>
          <div className={classes.calendarWrapper}>
            <ReactCalendar
              className={classes.reactCalendar}
              navigationLabel={false}
              tileDisabled={({date, view }) => 
                date.getMonth()=== 7 || date.getMonth()=== 9}
            />
          </div>
          <div className={classes.timePickerWrapper}>
            <TimePicker />
          </div>
        </div>
      </React.Fragment>
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
      "font-size" : "15px",
      "font-weight" : "bold"
    }
  }
}));
  
export default Calendar;