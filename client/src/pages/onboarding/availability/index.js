import React, { useContext } from "react";
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
import UserContext from "../../../utils/userContext";

function AvailabilityPage(props) {
  const { user, isAuthenticated } = useContext(UserContext);
  const jwtToken = localStorage.getItem("jwtToken");

  const { classes } = props;

  if (typeof props.location.users === "undefined") {
    alert("Missing information redirecting");
    window.location = "/" + user.calendarUrl + "/profile_setting/timezone";
  }
  const [users, setUsers] = React.useState({
    timeZone: props.location.users.timezone,
    availableHoursFrom: "",
    availableHoursTo: "",
    availableDays: [],
    calendarUrl: props.location.users.calendarUrl,
  });

  function onChangeAvailableHoursFrom(e) {
    setUsers({
      timeZone: users.timeZone,
      availableHoursFrom: e.target.value,
      availableHoursTo: users.availableHoursTo,
      availableDays: users.availableDays,
      calendarUrl: users.calendarUrl,
    });
  }
  function onChangeAvailableHoursTo(e) {
    setUsers({
      timeZone: users.timeZone,
      availableHoursFrom: users.availableHoursFrom,
      availableHoursTo: e.target.value,
      availableDays: users.availableDays,
      calendarUrl: users.calendarUrl,
    });
  }
  function onChangeAvailableDays(e) {
    setUsers({
      timeZone: users.timeZone,
      availableHoursFrom: users.availableHoursFrom,
      availableHoursTo: users.availableHoursTo,
      availableDays: addDays(e.target.value),
      calendarUrl: users.calendarUrl,
    });
  }

  function addDays(value) {
    if (users.availableDays.includes(value)) {
      const index = users.availableDays.indexOf(value);
      users.availableDays.splice(index, 1);
    } else {
      users.availableDays.push(value);
    }
    return users.availableDays;
  }

  function onFinish(e) {
    e.preventDefault();
    if (users.availableHoursFrom === "" || users.availableHoursTo === "") {
      alert("Please make sure all fields have a value");
      window.location = "/" + user.calendarUrl + "/profile_setting/timezone";
    }
    axios
      .put(`/user/${user._id}`, users)
      .then((res) => {
        window.location = "/home";
      })
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
                  control={
                    <Checkbox
                      value="Sundays"
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
                      value="Mondays"
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
                      value="Tuesdays"
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
                      value="Wednesdays"
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
                      value="Thursdays"
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
                      value="Fridays"
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
                      value="Saturdays"
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
