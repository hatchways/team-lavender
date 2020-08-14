import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Timezone from "./pages/onboarding/timezone/Onboarding.timezone"
import Confirm from "./pages/onboarding/confirm/Onboarding.confirm"
import Availability from "./pages/onboarding/availability/Onboarding.availability"


import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/profile_setting/timezone" component={Timezone} />
        <Route path="/profile_setting/confirm" component={Confirm} />
        <Route path="/profile_setting/availability" component={Availability} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
