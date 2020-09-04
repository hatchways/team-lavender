import React,{useContext} from "react";

import { Button, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import ConfirmPageStyle from "./style";
import UserContext from "../../../utils/userContext"


function ConfirmPage(props) {
  const {isAuthenticated} = useContext(UserContext)
  const jwtToken=localStorage.getItem("jwtToken")
  //if user is not authenticated, redirect to login page
  if(!jwtToken && !isAuthenticated){
     window.location="/"
  }
  
  const { classes } = props;
  const [url, setUrl] = React.useState({
    next: window.location.pathname.replace("confirm", "availability"),
    prev: window.location.pathname.replace("confirm", "timezone"),
  });
  if (typeof props.location.users === "undefined") {
    alert("Missing information redirecting");
    window.location = url.prev;
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
            Here is how CalendApp will work with john-doe@gmail.com :{" "}
          </div>
          <Divider />
          <div className={classes.belowDivider_secondDiv}>
            <div>
              1. We will check "<b>john-doe@gmail.com</b>" for conflicts
            </div>
            <Button className={classes.belowDivider_secondDiv_button}>
              Edit
            </Button>
          </div>
          <Divider />
          <div className={classes.belowDivider_thirdDiv}>
            <div>
              2. We will add event to "<b>john-doe@gmail.com</b>"
            </div>
            <Button className={classes.belowDivider_secondDiv_button}>
              Edit
            </Button>
          </div>
          <Divider />
          <div className={classes.belowDivider_fourthDiv}>
            <Link
              to={{ pathname: url.next, users: users }}
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
