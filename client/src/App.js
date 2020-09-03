import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Timezone from "./pages/onboarding/timezone";
import Confirm from "./pages/onboarding/confirm";
import Availability from "./pages/onboarding/availability";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/ScheduleCalendar/CalendarPage";
import AppointmentConfirm from "./pages/ScheduleCalendar/ConfirmPage";
import Test from "./pages/Test";
import Upgrade from "./pages/Upgrade";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/test" component={Test} />
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
          <Route path="/:calendarUrl/upgrade" component={Upgrade} />
          <Route
            exact
            path="/:calendarUrl/:eventURL/confirm"
            component={AppointmentConfirm}
          />
          <Route exact path="/:calendarUrl/:eventUrl" component={Schedule} />
          <Route exact path="/:calendarUrl" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
