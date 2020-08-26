import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Timezone from "./pages/onboarding/timezone";
import Confirm from "./pages/onboarding/confirm";
import Availability from "./pages/onboarding/availability";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import Upgrade from "./pages/Upgrade";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Signup} />
        <Route path="/login" component={Login} />

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
        <Route path="/:calendarUrl/upgrade" component={Upgrade} />

        <Route path="/test" component={Test} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
