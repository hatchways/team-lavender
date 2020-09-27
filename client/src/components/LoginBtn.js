import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import API from "../utils/googleAPI";

function LoginBtn(props) {
  async function login(res) {
    //if logged in for first time, will return a authorization code only
    console.log(res.code);
    if (res.code) {
      const response = await API.authenticateUser(res.code);
      console.log(response);

      //save user info into local storage for future use
      localStorage.setItem("googleEmail", response.email);
      localStorage.setItem("jwtToken", response.jwtToken);

      if (response.isNewUser) {
        window.location = `${response.calendarUrl}/profile_setting/timezone`;
      } else {
        window.location = `/home`;
      }
    } else {
      //if user is already signed in, will return GoogleUser automatically
      console.log(res);
    }
  }

  function handleLoginFailure(response) {
    alert("Failed to log in");
  }

  //=====================================================
  //move to config later
  //=====================================================

  let clientID =
    "871373961261-rjej65g97dc3o6jiuflq6s2gp5v9ptut.apps.googleusercontent.com";

  return (
    <GoogleLogin
      clientId={clientID}
      buttonText={props.loginText}
      onSuccess={login}
      onFailure={handleLoginFailure}
      cookiePolicy={"single_host_origin"}
      scope="https://www.googleapis.com/auth/calendar.events"
      responseType="code"
      accessType="offline"
      className={props.className}
    />
  );
}

export default LoginBtn;
