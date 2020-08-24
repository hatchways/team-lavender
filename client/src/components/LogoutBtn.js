import React from "react";
import { useGoogleLogout } from "react-google-login";

let clientID =
  "871373961261-rjej65g97dc3o6jiuflq6s2gp5v9ptut.apps.googleusercontent.com";

function LogoutBtn() {
  // imported to load gapi
  let { loaded} = useGoogleLogout({
    clientId: clientID,
  });

  function logout() {
    //if user is signed in, gapi exists, if not, gapi is undefined
    let gapi = window["gapi"];
    if (gapi) {
      const auth2 = gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        auth2.signOut().then((res) => {
          console.log("User signed out.");
        });
      }
    }
    //removing for now, can keep it for future use
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expireAt");
  }

  
  return (<> 
    <button onClick={logout} >Log out</button>
    </>
  );
}

export default LogoutBtn;
