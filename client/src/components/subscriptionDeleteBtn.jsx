import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

function SubcribeDeleteBtn() {
  const classes = useStyles();
  const [url, setUrl] = useState(
    window.location.pathname.replace("/upgrade", "").replace("/", "")
  );
  const body = {
    url,
  };
  function handleCancelation() {
    axios
      .post("/upgrade/delete", body)
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
