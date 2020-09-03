import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const NavBar = () => {
  const classes = useStyles();
  const [url, setUrl] = useState(window.location.pathname);
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
              to="/integration"
              activeClassName="selected"
              activeStyle={{ color: "#F78104" }}
              className={classes.link}
            >
              Integration
            </NavLink>
            <NavLink
              to={url + "/upgrade"}
              activeClassName="selected"
              activeStyle={{ color: "#F78104" }}
              className={classes.link}
            >
              Update account
            </NavLink>
          </nav>
          <Avatar
            alt="John Doe"
            src="data:image/jpeg;base64,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"
            className={classes.avatar}
          />
          <Typography className={classes.userName}>John Doe</Typography>
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
