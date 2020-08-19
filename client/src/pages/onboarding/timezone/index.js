import React, { Component, useState } from "react";
import axios from "axios";

import {
  Button,
  Divider,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import TimezonePageStyle from "./style";

function TimezonePage(props) {
  const { classes } = props;
  const [users, setUsers] = React.useState({ calendarUrl: "", timezone: "" });

  function onChangeUrl(e) {
    setUsers({ calendarUrl: e.target.value, timezone: users.timezone });
  }
  function onChangeTimezone(e) {
    setUsers({ calendarUrl: users.calendarUrl, timezone: e.target.value });
  }
  function onContinue(e) {
    if (users.calendarUrl === "" || users.timezone === "") {
      e.preventDefault();
      alert("Please make sure all fields have a value");
      window.location = "/profile_setting/timezone";
    }
    axios
      .get(`http://localhost:3001/user/is_unique`, {
        params: {
          calendarUrl: users.calendarUrl,
        },
      })
      .then((res) => {
        console.log(res.data, users.calendarUrl);
      })
      .catch((err) => {
        console.log("Error: " + err + err.response.data.message);
        e.preventDefault();
        alert("This url is taken, try a new one");
        window.location = "/profile_setting/timezone";
      });
  }

  return (
    <div>
      <div className={classes.title}>
        <div style={{ color: "#F78104" }}>calend</div>App
      </div>
      <div className={classes.timezoneContainer}>
        <div className={classes.aboveDivder}>
          <div className={classes.aboveDivider_firstDiv}>
            <p className={classes.aboveDivider_firstDiv_p}>
              Welcome to CalendApp!
            </p>
          </div>
          <div className={classes.aboveDivider_secondDiv}>
            <div className={classes.aboveDivider_secondDiv_firstDiv}>
              <div
                className={classes.aboveDivider_secondDiv_firstDiv_divs}
              ></div>
            </div>
          </div>
        </div>
        <Divider />
        <div className={classes.belowDivider}>
          <div className={classes.belowDivider_firstDiv}>
            <div className={classes.belowDivider_firstDiv_firstDiv}>
              Create your calendApp URL :{" "}
            </div>
            <div className={classes.belowDivider_firstDiv_secondDiv}>
              <div
                className={
                  classes.belowDivider_firstDiv_secondDiv_textFieldWrapper
                }
              >
                <p>calendapp.com/</p>
                <Divider orientation="vertical" flexItem />
                <TextField
                  className={
                    classes.belowDivider_firstDiv_secondDiv_textFieldWrapper_TextField
                  }
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontSize: "18px",
                      font: "Arial, Helvetica, sans-serif",
                    },
                  }}
                  onChange={onChangeUrl}
                  margin="dense"
                  size="medium"
                />
              </div>
            </div>
          </div>
          <div className={classes.belowDivider_secondDiv}>
            <div className={classes.belowDivider_secondDiv_firstDiv}>
              Select your time zone :{" "}
            </div>
            <div className={classes.belowDivider_secondDiv_secondDiv}>
              <FormControl
                variant="outlined"
                className={classes.belowDivider_secondDiv_secondDiv_FormControl}
              >
                <InputLabel>Time Zone</InputLabel>
                <Select onChange={onChangeTimezone}>
                  <MenuItem value={"UTC-7 PDT"}>UTC-7 PDT</MenuItem>
                  <MenuItem value={"UTC-6 MDT"}>UTC-6 MDT</MenuItem>
                  <MenuItem value={"UTC-5 CDT"}>UTC-5 CDT</MenuItem>
                  <MenuItem value={"UTC-4 EDT"}>UTC-4 EDT</MenuItem>
                  <MenuItem value={"UTC-3 ADT"}>UTC-3 ADT</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.belowDivider_thirdDiv}>
            <Link
              onClick={onContinue}
              to={{ pathname: "/profile_setting/confirm", users: users }}
              style={{ textDecoration: "none" }}
            >
              <Button className={classes.belowDivider_thirdDiv_continueButton}>
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(TimezonePageStyle)(TimezonePage);
