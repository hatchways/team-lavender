import React from "react";
import { GoogleLogout } from "react-google-login";

function Logout(props) {
  function logout(response) {
    //removing for now, can keep it for future use
    localStorage.removeItem("googleAvatarUrl");
     localStorage.removeItem("googleName");
     localStorage.removeItem("googleEmail");
    console.log(response);
  }

  function handleLogoutFailure(response) {
    alert("Failed to log out");
  }

  return (
    <GoogleLogout
      clientId={props.clientID}
      buttonText={props.logOutText}
      onLogoutSuccess={logout}
      onFailure={handleLogoutFailure}
    />
  );
}

export default Logout;
