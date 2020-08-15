import React from "react";
import { GoogleLogout } from "react-google-login";


function LogoutBtn(props) {
  function logout(response) {
    //removing for now, can keep it for future use
    localStorage.removeItem("googleAvatarUrl");
     localStorage.removeItem("googleName");
     localStorage.removeItem("googleEmail");
     localStorage.removeItem("accessToken");
     localStorage.removeItem("expireAt");
    console.log(response);
  }

  function handleLogoutFailure(response) {
    alert("Failed to log out");
  }
  let clientID = "871373961261-rjej65g97dc3o6jiuflq6s2gp5v9ptut.apps.googleusercontent.com"

  return (
    <GoogleLogout
      clientId={clientID}
      buttonText={props.logOutText}
      onLogoutSuccess={logout}
      onFailure={handleLogoutFailure}
    />
  );
}

export default LogoutBtn;
