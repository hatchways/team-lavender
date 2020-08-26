import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import API from "../utils/googleAPI";

function LoginBtn(props) {
  async function login(res) {
    //if logged in for first time, will return a authorization code only
    if (res.code) {
      const response = await API.authenticateUser(res.code);

      //save user info into local storage for future use
      localStorage.setItem("googleAvatarUrl", response.userInfo.picture);
      localStorage.setItem("googleName", response.userInfo.name);
      localStorage.setItem("googleEmail", response.userInfo.email);
      localStorage.setItem("accessToken", response.tokens.access_token);
      localStorage.setItem("expireAt", response.tokens.expires_at);

      let user = {
        name: response.userInfo.name,
        email: response.userInfo.email,
        avatarUrl: response.userInfo.picture,
        timeZone: "America/Toronto",
      };
      axios
        .post("/user/signup", user)
        .then((res) => {
          if (res.data.message == "Created new user") {
            window.location = `${res.data.calendarUrl}/profile_setting/timezone`;
          }
          if (res.data.message == "Already Exist User Account") {
            window.location = `${res.data.calendarUrl}/welcome`;
          }
        })
        .catch((err) => console.log("Error: " + err));
    } else {
      //if user is already signed in, will return GoogleUser automatically
      console.log(res)
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
      redirectUri="http://localhost:3000"
      //automatically return GoogleUser if user is signed in 
      isSignedIn={true}
      className={props.className}
    />
  );
}

export default LoginBtn;
