import React from "react";

const UserContext = React.createContext({
  user:"",
  isAuthenticate:false
});

export default UserContext; 
