import React,{useContext} from "react";
import NavBar from "../components/navbar";
import MainContent from "../components/mainContent";
import UserContext from "../utils/userContext"


function Dashboard() {
  const {isAuthenticated} = useContext(UserContext)
  //if user is not authenticated, redirect to login page
  if(!isAuthenticated){
     window.location="/"
  }


  return (
    <div>
      <NavBar />
      <MainContent />
    </div>
  );
}

export default Dashboard;
