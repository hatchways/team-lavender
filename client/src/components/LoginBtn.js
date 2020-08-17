import React from "react";
import { GoogleLogin } from "react-google-login";
import API from "../utils/googleAPI";

function LoginBtn(props) {
  async function login(response) {
    try {
      if (response.code) {
        const result = await API.getGoogleCredentials(response.code);
        console.log("fetch", result);
        // props.login(result);
      } else {
        throw new Error(response);
      }
    } catch (e) {
      console.log(e);
    }

    // if (response.profileObj) {
    //   localStorage.setItem("googleAvatarUrl", response.profileObj.imageUrl);
    //   localStorage.setItem("googleName", response.profileObj.name);
    //   localStorage.setItem("googleEmail", response.profileObj.email);
    //   localStorage.setItem("accessToken", response.tokenObj.access_token);
    //   localStorage.setItem("expireAt", response.tokenObj.expires_at);
    // }

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
