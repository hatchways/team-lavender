import React from "react";
import LogoutBtn from "../components/LogoutBtn";
import { GoogleLogout } from "react-google-login";

import API from "../utils/googleAPI";

function Test() {
  function handleClick() {

  // get calendar url from the window url
  //eg: user visited "calendly/mila-windsor/30min"
  // calendarUrl: mila-windsor
    
    const data = {
      calendarUrl:"mila-windsor",
      year:"2020", // collected from the date user clicked on 
      month:"08",
      date:"23",
      meetingLength: "30mins", //from the calendar type
      timeZone: "America/Toronto", // use moment to get time zone
    };
    API.getAvailability(data).then((res) => {
      console.log(res);
    });
  }
  return (
    <>
      <button onClick={handleClick}> here</button>
      <LogoutBtn />
      <GoogleLogout/>
    </>
  );
}

export default Test;
