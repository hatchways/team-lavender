import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core"

const MeetingConfirm = (props) => {
    let pathArray = window.location.pathname.split('/');
    const classes = useStyles();
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [calendarURL, setCalendarURL] = React.useState(pathArray[1])
    function scheduleAppointment() {
        props.confirmAppointment(name,email,calendarURL);
    }

    return (
      <div className={classes.container}>
        <div>Enter Details</div>
        <form className={classes.root} autoComplete="off">
            <TextField className={classes.textField} fullWidth id="outlined-basic" label="Name" name="name" variant="outlined" onChange={(event) => {setName(event.target.value)}} />
            <TextField className={classes.textField} fullWidth id="outlined-basic" label="Email" name="email" variant="outlined" onChange={(event) => {setEmail(event.target.value)}}/>
            <Button className={classes.confirmButton} type="submit" onClick={scheduleAppointment}>Schedule Meeting</Button>
        </form>
      </div>
    );
};


const useStyles = makeStyles((theme) => ({
    container : {
        margin : "auto",
        "& > div" : {
            fontSize : "20px"
        }
    },
    confirmButton : {
        backgroundColor : "#F77102",
        "margin-top" : "20px",
        fontSize : "15px",
        color : "white",
        "font-weight" : "normal",
        padding : "13px"
    },
    textField : {
        "margin-top" : "20px"
    },
}));
  
export default MeetingConfirm;