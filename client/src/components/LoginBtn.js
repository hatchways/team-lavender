import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

function LoginBtn(props) {
  function login(response) {
    console.log(response);
    if (response.profileObj) {
      let user = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        avatarUrl: response.profileObj.imageUrl,
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
      localStorage.setItem("googleAvatarUrl", response.profileObj.imageUrl);
      localStorage.setItem("googleName", response.profileObj.name);
      localStorage.setItem("googleEmail", response.profileObj.email);
      localStorage.setItem("accessToken", response.tokenObj.access_token);
      localStorage.setItem("expireAt", response.tokenObj.expires_at);
    }
  }

  function handleLoginFailure(response) {
    alert("Failed to log in");
  }
  let clientID =
    "871373961261-rjej65g97dc3o6jiuflq6s2gp5v9ptut.apps.googleusercontent.com";

  return (
    <GoogleLogin
      clientId={clientID}
      buttonText={props.loginText}
      onSuccess={login}
      onFailure={handleLoginFailure}
      cookiePolicy={"single_host_origin"}
      responseType="code,token"
      // isSignedIn={true}
      className={props.className}
    />
  );
}

export default LoginBtn;
