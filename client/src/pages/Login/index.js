import React, { useState, useEffect } from "react";

import { Button, Divider, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import LoginPageStyle from "./style";
import LoginBtn from "../../components/LoginBtn";

function LoginPage(props) {
  const [step, setStep] = useState({
    step: 1,
    email: "",
  });
  const { classes } = props;
  let userEmail;

  useEffect(() => {
    //check localStorage for user email, if exists, move to step 2
    userEmail = localStorage.getItem("googleEmail");
    if (userEmail)
      setStep({
        step: 2,
        email: userEmail,
      });
  }, []);

  return (
    <div>
      <div className={classes.title}>
        <div style={{ color: "#F78104" }}>calend</div>App
      </div>
      {step.step === 1 && (
        <div className={classes.signupContainer}>
          <div className={classes.aboveDivider}>
            <div className={classes.firstDivAboveDivider}>
              Sign up with CalendApp
            </div>
            <div className={classes.secondDivAboveDivider}>
              <div className={classes.firstDivOfSecondDivAboveDivider}>
                Enter your e-mail to get started
              </div>
              <TextField
                className={classes.textFieldOfSecondDivAboveDivider}
                label="E-mail address"
                variant="outlined"
                onChange={(e) => setStep({ ...step, email: e.target.value })}
              ></TextField>
            </div>
            <Button
              className={classes.startButton}
              onClick={() => setStep({ ...step, step: 2 })}
            >
              Continue
            </Button>
          </div>
          <Divider />
          <div className={classes.belowDivider}>
            Don't have account?
            <Link className={classes.signupButton} to={{ pathname: "/" }}>
              Sign up
            </Link>
          </div>
        </div>
      )}
      {step.step === 2 && (
        <div className={classes.signupContainer}>
          <div className={classes.aboveDivider}>
            <div className={classes.firstDivAboveDivider}>
              Welcome back<br></br>
              {step.email}
            </div>
            <LoginBtn
              className={classes.gmailSignup}
              loginText="Login with Google"
              source="Login"
            />
          </div>
          <Divider />
          <div className={classes.belowDividerStepTwo}>
            Don't have an account?
            <Link
              className={classes.buttonbelowDividerStepTwo}
              to={{ pathname: "/" }}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default withStyles(LoginPageStyle)(LoginPage);
