import React from "react";
import API from "../utils/googleAPI"

function Test(){


  function handleClick(){
    API.getEvents().then((res)=> {console.log("frontend",res)})
    
  }
  
    
    return (
      <button onClick={ handleClick}> here</button>
    );

}

export default Test;
