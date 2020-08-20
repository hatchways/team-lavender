import React from "react";
import LogoutBtn from "../components/LogoutBtn";
import API from "../utils/googleAPI";

function Test() {
  function handleClick() {
    API.getAvailability({ availability: "year=2020&month=08&date=20",meetingLength:"30mins" }).then((res) => {
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
