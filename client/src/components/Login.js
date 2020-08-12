import React from "react";
import { GoogleLogin } from "react-google-login";

function Login(props) {
  function login(response) {
    console.log(response);
    if (response.profileObj) {
      localStorage.setItem("googleAvatarUrl", response.profileObj.imageUrl);
      localStorage.setItem("googleName", response.profileObj.name);
      localStorage.setItem("googleEmail", response.profileObj.email);
    }
  }
  function handleLoginFailure(response) {
    alert("Failed to log in");
  }

  return (
    <GoogleLogin
      clientId={props.clientID}
      buttonText={props.loginText}
      onSuccess={login}
      onFailure={handleLoginFailure}
      cookiePolicy={"single_host_origin"}
      responseType="code,token"
      isSignedIn={true}
    />
  );
}

export default Login;
