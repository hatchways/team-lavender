import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimePicker from "./TimePicker";
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import API from "../utils/googleAPI";
import { useHistory } from "react-router-dom"
import LinkChecker from "../utils/linkChecker"

const Calendar = (props) => {
    const classes = useStyles();
    const [availability, setAvailability] = React.useState(Object);
    const [pickedDate, setPickedDate] = React.useState();
    const history = useHistory();
    const [year, setYear] = React.useState();
    const [month, setMonth] = React.useState();
    const [date, setDate] = React.useState();
    const [hostAvailableDay, setHostAvailableDay] = React.useState(Array);
    const [today, setToday] = React.useState(new Date())
   
    useEffect(() => {
      const check = async function() {
        const data = {
          calendarURL : props.userURL
        }
        const res = await LinkChecker.getHostAvailableDay(data);
        console.log(res.data.hostAvailableDay)
        if (res.data.hostAvailableDay) {
          setHostAvailableDay(res.data.hostAvailableDay)
        } else {
          console.log("host is not available")
        }
      }
      check()
    }, [])

    function getAvailableTime(pickedDate) {
      const p = new Date(pickedDate);
      setPickedDate(p);
      let year = (p.getYear() + 1900).toString();
      let month = ('0' + (p.getMonth() + 1).toString()).slice(-2);
      let date = ('0' + p.getDate().toString()).slice(-2);
      setYear(year)
      setMonth(month)
      setDate(date)
      
      history.push(`/${props.userURL}/${props.eventURL}?date=${year}-${month}-${date}`)

      const data = {
        calendarUrl: props.userURL,
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

    function toConfirmAppointmentPage(clickedTime) {

      history.push(`/${props.userURL}/${props.eventURL}/confirm?date=${year}-${month}-${date}&time=${clickedTime}&eventURL=${props.eventURL}`)
    }

    return (
      <div className={classes.container}>
        <div className={classes.calendarWrapper}>
          <ReactCalendar
            view="month"
            className={classes.reactCalendar}
            tileDisabled={({date, view }) =>
              date.getMonth() < today.getMonth() ||
              (date.getDate() < today.getDate() &&
              date.getMonth() < today.getMonth() + 1) ||
              hostAvailableDay.some(day => {
                return date.getDay() === day
              })
            }
            onChange={getAvailableTime}
          />
        </div>
        <div className={classes.timePickerWrapper}>
          <TimePicker availability={availability} toConfirmAppointmentPage={toConfirmAppointmentPage}/>
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