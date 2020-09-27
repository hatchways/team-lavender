import React, { useContext } from "react";
import NavBar from "../components/navbar";
import MainContent from "../components/mainContent";
import UserContext from "../utils/userContext";

function Dashboard() {
  return (
    <div>
      <NavBar />
      <MainContent />
    </div>
  );
}

export default Dashboard;
