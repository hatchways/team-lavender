import React, { useContext } from "react";
import NavBar from "../components/navbar";
import MainContent from "../components/mainContent";
import UserContext from "../utils/userContext";

function Dashboard() {
  const { isAuthenticate } = useContext(UserContext);
  const jwtToken = localStorage.getItem("jwtToken");
  //if user is not authenticated, redirect to login page
  if (!jwtToken && !isAuthenticate) {
    window.location = "/";
  }

  return (
    <div>
      <NavBar />
      <MainContent />
    </div>
  );
}

export default Dashboard;
