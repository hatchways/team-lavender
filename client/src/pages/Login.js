import React, { Component, useState } from "react";

import { Button, Divider, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import LoginPageStyle from "../css/LoginCss";

function LoginPage (props) {
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
                        <Button className={classes.startButton} onClick={() => setStep(2)}>Continue</Button>
                    </div>
                    <Divider />
                    <div className={classes.belowDivider}>Don't have account?
                        <Link className={classes.signupButton} to={{pathname: "/"}}>Sign up</Link>
                    </div>
                </div>
            )}
            {step == 2 && (
                <div className={classes.signupContainer}>
                    <div className={classes.aboveDivider}>
                        <div className={classes.firstDivAboveDivider}>Welcome back<br></br>john-doe@gmail.com</div>
                        <Button className={classes.gmailSignup}>Login with Google</Button>
                    </div>
                    <Divider />
                    <div className={classes.belowDividerStepTwo}>Don't have an account?
                        <Link className={classes.buttonbelowDividerStepTwo} to={{pathname: "/"}}>Sign up</Link>
                    </div>
                </div>
            )}
        </div>
    );
    
}

export default withStyles(LoginPageStyle)(LoginPage);
