import React from "react";
import { GoogleLogin } from "react-google-login";

function LoginBtn(props) {
  function login(response) {
    console.log(response);
    if (response.profileObj) {
      localStorage.setItem("googleAvatarUrl", response.profileObj.imageUrl);
      localStorage.setItem("googleName", response.profileObj.name);
      localStorage.setItem("googleEmail", response.profileObj.email);
      localStorage.setItem("accessToken", response.tokenObj.access_token);
      localStorage.setItem("expireAt", response.tokenObj.expires_at);
    }
    if (props.source === "Signup") {
      window.location.href = "/profile_setting/timezone";
    }
    if (props.source === "Login") {
      window.location.href = "/welcome";
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
