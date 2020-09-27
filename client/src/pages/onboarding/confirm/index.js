import React, { useContext } from "react";

import { Button, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ConfirmPageStyle from "./style";
import UserContext from "../../../utils/userContext";

function ConfirmPage(props) {
  const { isAuthenticated, user } = useContext(UserContext);
  const jwtToken = localStorage.getItem("jwtToken");

  const { classes } = props;

  if (typeof props.location.users === "undefined") {
    alert("Missing information redirecting");
    window.location = "/" + user.calendarUrl + "/profile_setting/timezone";
  }
  const [users] = React.useState(props.location.users);

  return (
    <div>
      <div className={classes.title}>
        <div style={{ color: "#F78104" }}>calend</div>App
      </div>
      <div className={classes.timezoneContainer}>
        <div className={classes.aboveDivder}>
          <div className={classes.aboveDivider_firstDiv}>
            <p className={classes.aboveDivider_firstDiv_p}>
              Your Google Calendar is Connected!
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
            Here is how CalendApp will work with {user.email} :{" "}
          </div>
          <Divider />
          <div className={classes.belowDivider_secondDiv}>
            <div>
              1. We will check "<b>{user.email}</b>" for conflicts
            </div>
            <Button className={classes.belowDivider_secondDiv_button}>
              Edit
            </Button>
          </div>
          <Divider />
          <div className={classes.belowDivider_thirdDiv}>
            <div>
              2. We will add event to "<b>{user.email}</b>"
            </div>
            <Button className={classes.belowDivider_secondDiv_button}>
              Edit
            </Button>
          </div>
          <Divider />
          <div className={classes.belowDivider_fourthDiv}>
            <Link
              to={{
                pathname:
                  "/" + user.calendarUrl + "/profile_setting/availability",
                users: users,
              }}
              style={{ textDecoration: "none" }}
            >
              <Button className={classes.belowDivider_fourthDiv_continueButton}>
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(ConfirmPageStyle)(ConfirmPage);
