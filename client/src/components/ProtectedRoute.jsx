import React, { useContext } from "react";
import { Route } from "react-router-dom";
import UserContext from "../utils/userContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, isAuthenticate } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticate) {
          return <Component {...props} />;
        } else {
          return (
            <div>
              <div>Not authenticated.Please login</div>
              <a href="/">Login</a>
            </div>
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
