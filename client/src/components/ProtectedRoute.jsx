import React, { useContext } from "react";
import { Route } from "react-router-dom";
import UserContext from "../utils/userContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, isAuthenticated } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <div></div>;
        }
      }}
    />
  );
};

export default ProtectedRoute;
//<div>Not authenticated.Please login</div>
//<a href="/">Login</a>
