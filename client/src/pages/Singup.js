import React, { Component,useState } from "react";

import { Button, Divider, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import SignupPageStyle from "../css/SignupCss";

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
