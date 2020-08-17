import React from "react";
import API from "../utils/googleAPI"
import LogoutBtn from "../components/LogoutBtn"

function Test(){


  function handleClick(){
    API.getEvents({user:"mila",availability:"2020-08-10"}).then((res)=> {console.log("frontend",res)})
    
  }
    return (
      <>
      <button onClick={ handleClick}> here</button>
      <LogoutBtn />

      </>
    );

}

export default Test;
