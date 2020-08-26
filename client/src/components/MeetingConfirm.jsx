import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core"

const MeetingConfirm = (props) => {
    const classes = useStyles();
    

    return (
      <div className={classes.container}>
        <div>Enter Details</div>
        <form className={classes.root} autoComplete="off">
            <TextField className={classes.textField} fullWidth id="outlined-basic" label="Name" variant="outlined" />
            <TextField className={classes.textField} fullWidth id="outlined-basic" label="Email" variant="outlined" />
            <Button className={classes.confirmButton}>Schedule Meeting</Button>
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