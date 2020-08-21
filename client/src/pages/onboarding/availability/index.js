import React from "react";
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
import AvailabilityPageStyle from "./style";

function AvailabilityPage(props) {
  const { classes } = props;

  const [url, setUrl] = React.useState({
    prev: window.location.pathname.replace("availability", "timezone"),
    calendarUrl:
      window.location.origin +
      window.location.pathname.replace("/profile_setting/availability", ""),
  });
  console.log(url.calendarUrl);
  if (typeof props.location.users === "undefined") {
    alert("Missing information redirecting");
    window.location = url.prev;
  }
  const [users, setUsers] = React.useState({
    name: "test",
    email: "test@gmail.com",
    avatarUrl: "test.com",
    timeZone: props.location.users.timezone,
    availableHoursFrom: "",
    availableHoursTo: "",
    availableDays: ["Monday", "Tuesday", "Wednesday"],
    calendarUrl: props.location.users.calendarUrl,
  });

  console.log("Users", users);
  console.log(url.calendarUrl, users.calendarUrl);

  function onChangeAvailableHoursFrom(e) {
    console.log("Users", users.timeZone);
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
    console.log(e.target.value);
    setUsers({
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
      timeZone: users.timeZone,
      availableHoursFrom: users.availableHoursFrom,
      availableHoursTo: users.availableHoursTo,
      availableDays: users.availableDays.push(e.target.value),
      calendarUrl: users.calendarUrl,
    });
    console.log("Users", users);
  }

  function getCurrentUserId() {
    console.log("getCUId");
    return axios
      .get(`http://localhost:3001/user/is_unique`, {
        params: {
          calendarUrl: url.calendarUrl,
        },
      })
      .then((res) => {
        console.log(res.data, users.calendarUrl);
      })
      .catch((err) => {
        if (err.response.data.message == "this url is not unique") {
          console.log(
            err.response.data.message,
            err.response.data,
            err.response.data.id
          );
          return err.response.data.id;
        } else {
          alert("Something went wrong");
          window.location.reload();
        }
      });
  }

  function onFinish(e) {
    getCurrentUserId().then((data) => {
      console.log(data);
      e.preventDefault();
      if (users.availableHoursFrom === "" || users.availableHoursTo === "") {
        alert("Please make sure all fields have a value");
        window.location = url.prev;
      }
      axios
        .put(`http://localhost:3001/user/${data}`, users)
        .then((res) => {
          console.log(res.data);
          console.log(url.calendarUrl, users.calendarUrl);
          window.location = "/" + users.calendarUrl + "/welcome";
        })
        .catch((err) => console.log("Error: " + err));
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
                  control={
                    <Checkbox
                      value="Sunday"
                      onChange={onChangeAvailableDays}
                      color="#F78104"
                    />
                  }
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
                  control={
                    <Checkbox
                      value="Monday"
                      onChange={onChangeAvailableDays}
                      color="#F78104"
                    />
                  }
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
                  control={
                    <Checkbox
                      value="Tuesday"
                      onChange={onChangeAvailableDays}
                      color="#F78104"
                    />
                  }
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
                  control={
                    <Checkbox
                      value="Wednesday"
                      onChange={onChangeAvailableDays}
                      color="#F78104"
                    />
                  }
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
                  control={
                    <Checkbox
                      value="Thursday"
                      onChange={onChangeAvailableDays}
                      color="#F78104"
                    />
                  }
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
                  control={
                    <Checkbox
                      value="Friday"
                      onChange={onChangeAvailableDays}
                      color="#F78104"
                    />
                  }
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
                  control={
                    <Checkbox
                      value="Saturday"
                      onChange={onChangeAvailableDays}
                      color="#F78104"
                    />
                  }
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
