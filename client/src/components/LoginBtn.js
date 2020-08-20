import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import API from "../utils/googleAPI";


function LoginBtn(props) {
  async function login(res) {
      if (res.code) {
      const response = await API.authenticateUser(res.code);
        
      //save user info into local storage for future use
      localStorage.setItem("googleAvatarUrl", response.picture);
      localStorage.setItem("googleName", response.name);
      localStorage.setItem("googleEmail", response.email);
      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("expireAt", response.expires_at);
      
      let user = {
        name: response.name,
        email: response.email,
        avatarUrl: response.picture,
        timeZone: "America/Toronto",
      };
      axios
        .post("http://localhost:3001/user/signup", user)
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
        throw new Error(res);
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
      // prompt='consent'
      redirectUri="http://localhost:3000"
      // isSignedIn={true}
      className={props.className}
    />
  );
}

export default LoginBtn;
