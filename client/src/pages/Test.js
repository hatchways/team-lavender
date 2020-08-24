import React from "react";
import LogoutBtn from "../components/LogoutBtn";
import API from "../utils/googleAPI";

function Test() {
  function handleClick() {
    const data = {
      year:"2020", // collected from the date user clicked on 
      month:"08",
      date:"20",
      availableFrom: "09:00",// from database 
      availableTo: "17:00",
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
    </>
  );
}

export default Test;
