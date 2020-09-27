import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import UserContext from "../utils/userContext";
import LogoutBtn from "./LogoutBtn";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar className={classes.AppBar}>
          <Typography varient="title" className={classes.titleFirst}>
            calend
          </Typography>
          <Typography varient="title" className={classes.titleSecond}>
            app
          </Typography>

          <nav className={classes.links}>
            <NavLink
              to="/home"
              activeClassName="selected"
              activeStyle={{ color: "#F78104" }}
              className={classes.link}
            >
              Home
            </NavLink>
            <NavLink
              to={user.calendarUrl + "/profile_setting/timezone"}
              activeClassName="selected"
              activeStyle={{ color: "#F78104" }}
              className={classes.link}
            >
              Settings
            </NavLink>
            <NavLink
              to="/upgrade"
              activeClassName="selected"
              activeStyle={{ color: "#F78104" }}
              className={classes.link}
            >
              Update account
            </NavLink>
          </nav>
          <Avatar
            alt="John Doe"
            src={user.avatarUrl}
            className={classes.avatar}
          />
          <Typography className={classes.userName}>{user.name}</Typography>
          <LogoutBtn />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
const useStyles = makeStyles((theme) => ({
  AppBar: {
    background: "#ffffff",
  },
  titleFirst: {
    fontSize: 20,
    fontWeight: 600,
    color: "#F78104",
    textTransform: "lowercase",
  },
  titleSecond: {
    fontSize: 20,
    fontWeight: 600,
    color: "black",
    textTransform: "lowercase",
  },
  links: {
    flexGrow: 1,
    textAlign: "right",
  },
  link: {
    color: "black",
    marginRight: 10,
    fontWeight: 500,
    textDecoration: "none",
    "&:hover": {
      color: "#F78104",
    },
    "&:active": {
      color: "#F78104",
    },
  },
  avatar: {
    marginLeft: 40,
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  userName: {
    fontSize: 15,
    fontWeight: 500,
    marginRight: 10,
    marginLeft: 10,
    color: "black",
  },
}));

export default NavBar;
