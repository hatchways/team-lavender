import React from "react";

const UserContext = React.createContext({
  user: "",
  isAuthenticated: false,
});

export default UserContext;
