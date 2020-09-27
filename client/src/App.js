import React, { useEffect, useState, Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Timezone from "./pages/onboarding/timezone";
import Confirm from "./pages/onboarding/confirm";
import Availability from "./pages/onboarding/availability";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/ScheduleCalendar/CalendarPage";
import Upgrade from "./pages/Upgrade";
import AppointmentConfirm from "./pages/ScheduleCalendar/ConfirmPage";
import Test from "./pages/Test";
import API from "./utils/googleAPI";
import UserContext from "./utils/userContext";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = { user: "", isAuthenticated: false };
  }
  async componentWillMount() {
    let jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      await API.isTokenAuthenticated(jwtToken).then((response) => {
        if (response) {
          this.setState({
            user: response,
            isAuthenticated: true,
          });
        }
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <UserContext.Provider value={this.state}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/test" component={Test} />
              <ProtectedRoute
                path="/:calendarUrl/profile_setting/timezone"
                component={Timezone}
              />
              <ProtectedRoute
                path="/:calendarUrl/profile_setting/confirm"
                component={Confirm}
              />
              <ProtectedRoute
                path="/:calendarUrl/profile_setting/availability"
                component={Availability}
              />
              <ProtectedRoute
                path="/:calendarUrl/upgrade"
                component={Upgrade}
              />
              <Route
                exact
                path="/:calendarUrl/:eventURL/confirm"
                component={AppointmentConfirm}
              />
              <Route
                exact
                path="/:calendarUrl/:eventUrl"
                component={Schedule}
              />
              <ProtectedRoute
                exact
                path="/:calendarUrl"
                component={Dashboard}
              />
            </Switch>
          </BrowserRouter>
        </UserContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
