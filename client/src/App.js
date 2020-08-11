import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import GoogleBtn from "./components/GoogleBtn";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={LandingPage} />
        
        {/* demonstration purpose only, can be removed later */}
        <GoogleBtn />

      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
