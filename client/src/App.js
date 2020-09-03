import React, { useEffect, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Timezone from "./pages/onboarding/timezone";
import Confirm from "./pages/onboarding/confirm";
import Availability from "./pages/onboarding/availability";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import API from "./utils/googleAPI";
import UserContext from "./utils/userContext";


import "./App.css";

function App() {
  const [user, setUser] = useState({
    user: "",
    isAuthenticated: false,
  });

  useEffect(() => {
    let jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      API.isTokenAuthenticated(jwtToken).then((response) => {
        if (response) {
          setUser({
            user: response,
            isAuthenticated: true,
          });
        }
      });
    }
  }, []);


  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value = {user} >
      <BrowserRouter>
        <Route exact path="/" component={Signup} />
        <Route path="/login" component={Login} />

        {/* only available after login  */}
        {user.isAuthenticated && (
          <>
            <Route
              path="/:calendarUrl/profile_setting/timezone"
              component={Timezone}
            />
            <Route
              path="/:calendarUrl/profile_setting/confirm"
              component={Confirm}
            />
            <Route
              path="/:calendarUrl/profile_setting/availability"
              component={Availability}
            />
            <Route exact path="/:calendarUrl/welcome" component={Dashboard} />
          </>
        ) }

        <Route path="/test" component={Test} />
      </BrowserRouter>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
