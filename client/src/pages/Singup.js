import React, { Component,useState } from "react";

import { Button, Divider, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";

const SignupPageStyle = () => ({
//step 1
  signupContainer: {
    margin  :   "auto",
    width : "400px",
    height : "480px",
    "-webkit-box-shadow" : "1px 1px 10px 3px rgba(196,196,196,1)",
    font : "Arial, Helvetica, sans-serif",
    "font-weight" : "bold",
    "text-align" : "center"
  },
  aboveDivider : {
    position : "relative",
    height : "75%"
  },
  belowDivider : {
    "position" : "relative",
    "top" : "40px"
  },
  textField : {
  },
  firstDivAboveDivider : {
    "font-size" : "20px",
    "position" : "relative",
    "top" : "40px"
  },
  secondDivAboveDivider : {
    "position" : "relative",
    "top" : "70px"
  },
  firstDivOfSecondDivAboveDivider : {
    "font-size" : "12px",
    "margin-top" : "30px",
    "margin-bottom" : "10px"
  },
  textFieldOfSecondDivAboveDivider : {
    "width" : "70%"
  },
  startButton : {
    "width" : "30%",
    "font-size" : "13px",
    "position" : "relative",
    "font-weight" : "bold",
    "top" : "130px",
    "background-color" : "#F78104",
    "color" : "white",
    "padding" : "13px"
  },
  loginButton : {
    color : "#F78104",
    "text-decoration": "none" 
  },
  title : {
    display : "flex",
    "font-size" : "20px",
    "font-weight" : "bold",
    "justify-content" : "center",
    "margin" : "50px"
  },

// step 2
  signupDescription : {
    "position" : "relative",
    "top" : "70px",
    "padding-right" : "60px",
    "padding-left" : "60px",
    "font-weight" : "normal",
    "color" : "#808080",
    "font-size" : "13px"
  },
  gmailSignup : {
    "width" : "50%",
    "font-size" : "13px",
    "position" : "relative",
    "font-weight" : "bold",
    "top" : "130px",
    "background-color" : "#F78104",
    "color" : "white",
    "padding" : "13px"
  },
  belowDividerStepTwo : {
    "position" : "relative",
    "top" : "40px"
  },
  buttonbelowDividerStepTwo : {
    color : "#F78104",
  }
});

function SignupPage (props) {
    const [step, setStep] = useState(1);
    const { classes } = props;
    return (
        <div>
            <div className={classes.title}><div style={{color : "#F78104"}}>calend</div>App</div>
            {step == 1 && (
                <div className={classes.signupContainer}>
                    <div className={classes.aboveDivider}>
                        <div className={classes.firstDivAboveDivider}>Sign up with CalendApp</div>
                        <div className={classes.secondDivAboveDivider}>
                            <div className={classes.firstDivOfSecondDivAboveDivider}>Enter your e-mail to get started</div>
                            <TextField className={classes.textFieldOfSecondDivAboveDivider} label="E-mail address" variant="outlined"></TextField>
                        </div>
                        <Button className={classes.startButton} onClick={() => setStep(2)}>Get started</Button>
                    </div>
                    <Divider />
                    <div className={classes.belowDivider}>Already have an account? 
                        <Link className={classes.loginButton} to={{pathname: "/login"}}>Log in</Link>
                    </div>
                </div>
            )}
            {step == 2 && (
                <div className={classes.signupContainer}>
                    <div className={classes.aboveDivider}>
                        <div className={classes.firstDivAboveDivider}>Hi john-doe@gmail.com</div>
                        <div className={classes.signupDescription}>
                            The easist way for you to sign up is with Google.
                            This will automatically connect your calendar so you can start using CalendarApp right away!
                        </div>
                        <Button className={classes.gmailSignup}>Sign up with Google</Button>
                    </div>
                    <Divider />
                    <div className={classes.belowDividerStepTwo}>Prefer to create an account with a password?
                        <Button className={classes.buttonbelowDividerStepTwo} onClick={() => setStep(1)} >Click here</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withStyles(SignupPageStyle)(SignupPage);
