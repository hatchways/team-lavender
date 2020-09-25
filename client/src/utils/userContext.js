import React from "react";

const UserContext = React.createContext({
  user: "",
  isAuthenticated: true,
});

export default UserContext;
