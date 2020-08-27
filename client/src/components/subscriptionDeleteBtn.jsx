import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

function SubcribeDeleteBtn() {
  const [url, setUrl] = useState(
    window.location.pathname.replace("/upgrade", "").replace("/", "")
  );
  const body = {
    url,
  };
  function handleCancelation() {
    axios
      .post("http://localhost:3001/upgrade/delete", body)
      .then((response) => console.log("Response", response))
      .catch((err) => console.log("Error: " + err));
  }
  return (
    <Button variant="outlined" align="right" onClick={handleCancelation}>
      Cancel subscription
    </Button>
  );
}

export default SubcribeDeleteBtn;