import React, { Component } from "react";
import axios from "axios";

import {
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import AvailabilityPageStyle from "./style";

function AvailabilityPage(props) {
  const { classes } = props;
  const [users, setUsers] = React.useState({
    name: "test",
    email: "test@gmail.com",
    avatarUrl: "test.com",
    timeZone: props.location.users.timezone,
    availableHoursFrom: "",
    availableHoursTo: "",
    availableDays: ["Monday", "Thursaday", "Friday"],
    calendarUrl: props.location.users.url,
  });
  console.log("Users", users);

  function onChangeAvailableHoursFrom(e) {
    setUsers({
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
      timeZone: users.timeZone,
      availableHoursFrom: e.target.value,
      availableHoursTo: users.availableHoursTo,
      availableDays: users.availableDays,
      calendarUrl: users.calendarUrl,
    });
    console.log("Users", users);
  }
  function onChangeAvailableHoursTo(e) {
    setUsers({
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
      timeZone: users.timeZone,
      availableHoursFrom: users.availableHoursFrom,
      availableHoursTo: e.target.value,
      availableDays: users.availableDays,
      calendarUrl: users.calendarUrl,
    });
    console.log("Users", users);
  }
  function onChangeAvailableDays(e) {
    setUsers({
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
      timeZone: users.timeZone,
      availableHoursFrom: e.target.value,
      availableHoursTo: users.availableHoursTo,
      availableDays: ["Monday", "Thursaday", "Friday"],
      calendarUrl: users.calendarUrl,
    });
  }

  function onFinish(e) {
    e.preventDefault();
    axios
      .put("http://localhost:3001/user/5f3b483975bf92e46e28e1a6", users)
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Error: " + err));
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
              Set your availability
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
            <p>Available Hours :</p>
            <form className={classes.belowDivider_firstDiv_form} noValidate>
              <TextField
                variant="outlined"
                type="time"
                onChange={onChangeAvailableHoursFrom}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <p> ~ </p>
              <TextField
                variant="outlined"
                type="time"
                onChange={onChangeAvailableHoursTo}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </form>
          </div>
          <div className={classes.belowDivider_secondDiv}>
            <p>Available Days : </p>
            <div className={classes.belowDivider_secondDiv_secondDiv}>
              <div>
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="#F78104" />}
                  label={
                    <Typography style={{ "font-size": "12px" }}>
                      Sunday
                    </Typography>
                  }
                  labelPlacement="bottom"
                />
              </div>
              <Divider orientation="vertical" flexItem />
              <div>
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="#F78104" />}
                  label={
                    <Typography style={{ "font-size": "12px" }}>
                      Monday
                    </Typography>
                  }
                  labelPlacement="bottom"
                />
              </div>
              <Divider orientation="vertical" flexItem />
              <div>
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="#F78104" />}
                  label={
                    <Typography style={{ "font-size": "12px" }}>
                      Tuesday
                    </Typography>
                  }
                  labelPlacement="bottom"
                />
              </div>
              <Divider orientation="vertical" flexItem />
              <div>
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="#F78104" />}
                  label={
                    <Typography style={{ "font-size": "12px" }}>
                      Wednesday
                    </Typography>
                  }
                  labelPlacement="bottom"
                />
              </div>
              <Divider orientation="vertical" flexItem />
              <div>
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="#F78104" />}
                  label={
                    <Typography style={{ "font-size": "12px" }}>
                      Thursday
                    </Typography>
                  }
                  labelPlacement="bottom"
                />
              </div>
              <Divider orientation="vertical" flexItem />
              <div>
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="#F78104" />}
                  label={
                    <Typography style={{ "font-size": "12px" }}>
                      Friday
                    </Typography>
                  }
                  labelPlacement="bottom"
                />
              </div>
              <Divider orientation="vertical" flexItem />
              <div>
                <FormControlLabel
                  value="Saturdays"
                  control={<Checkbox color="#F78104" />}
                  label={
                    <Typography style={{ "font-size": "12px" }}>
                      Saturday
                    </Typography>
                  }
                  labelPlacement="bottom"
                />
              </div>
            </div>
          </div>
          <div className={classes.belowDivider_thirdDiv}>
            <Button
              onClick={onFinish}
              className={classes.belowDivider_thirdDiv_continueButton}
              href="/welcome"
            >
              Finish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(AvailabilityPageStyle)(AvailabilityPage);
