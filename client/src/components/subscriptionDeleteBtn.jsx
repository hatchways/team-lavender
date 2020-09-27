import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../utils/userContext";

function SubcribeDeleteBtn() {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const body = {
    url: user.calendarUrl,
  };
  function handleCancelation() {
    axios
      .post("/upgrade/delete", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authenticate: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        console.log("Response", response);
        alert(response.data);
        window.location.reload();
      })
      .catch((err) => console.log("Error: " + err));
  }
  return (
    <Button
      variant="outlined"
      align="right"
      onClick={handleCancelation}
      className={classes.button}
    >
      Cancel subscription
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    background: "#ffffff",
    textAlign: "right",
    textTransform: "none",
    color: "#F78104",
    borderColor: "#F78104",
    "&:hover": {
      background: "#F78104",
      color: "white",
    },
  },
}));

export default SubcribeDeleteBtn;
