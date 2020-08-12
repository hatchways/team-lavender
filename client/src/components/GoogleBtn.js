import React, { useState,useEffect } from "react";
import Login from "./Login"
import Logout from "./Logout"


function GoogleBtn(props) {
  let clientID = "871373961261-rjej65g97dc3o6jiuflq6s2gp5v9ptut.apps.googleusercontent.com"

//   let [clientID,setClientID] =useState("")

// useEffect(()=>{
//   fetch("/auth")
//   .then(res => {
//     console.log(res);
//     if (res.status === 200) return res.json();
//     else throw Error("OAuth ClientID is missing");
//   })
//     .then(res => {
//       console.log(res)
//       setClientID(res.clientID)
//       // else throw Error("Server error");
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// },[])

//just for testing purpose, will be removed later =========================
let user = localStorage.getItem("googleEmail")

  return (
    <div>
      {/* will be modified later ========================= */}
            {user ? <Logout clientID = {clientID} /> : <Login clientID = {clientID} />}
      
      
   
    </div>
  );
}

export default GoogleBtn;
