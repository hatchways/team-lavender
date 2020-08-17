import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Signup from "./pages/Singup";
import Login from "./pages/Login";
import Timezone from "./pages/onboarding/Onboarding.timezone";
import Confirm from "./pages/onboarding/Onboarding.confirm";
import Availability from "./pages/onboarding/Onboarding.availability";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/welcome" component={Dashboard} />
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
