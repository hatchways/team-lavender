import React, { Component } from "react";

import { Button, Divider, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";

const LoginPageStyle = () => ({
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
    "top" : "40px",
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
  signupButton : {
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
    "text-decoration": "none"
  }
});

class LoginPage extends Component {
    state = {
        step : 1
    };

    switchStep = () => {
        if (this.state.step == 1) {
            this.setState(prevState => ({ step: (prevState.step = 2) }));
        } else {
            this.setState(prevState => ({ step: (prevState.step = 1) }));
        }
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.title}><div style={{color : "#F78104"}}>calend</div>App</div>
                {this.state.step == 1 && (
                    <div className={classes.signupContainer}>
                        <div className={classes.aboveDivider}>
                            <div className={classes.firstDivAboveDivider}>Sign up with CalendApp</div>
                            <div className={classes.secondDivAboveDivider}>
                                <div className={classes.firstDivOfSecondDivAboveDivider}>Enter your e-mail to get started</div>
                                <TextField className={classes.textFieldOfSecondDivAboveDivider} label="E-mail address" variant="outlined"></TextField>
                            </div>
                            <Button className={classes.startButton} onClick={this.switchStep}>Continue</Button>
                        </div>
                        <Divider />
                        <div className={classes.belowDivider}>Don't have account?
                            <Link className={classes.signupButton} to={{pathname: "/"}}>Sign up</Link>
                        </div>
                    </div>
                )}
                {this.state.step == 2 && (
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
}

export default withStyles(LoginPageStyle)(LoginPage);
