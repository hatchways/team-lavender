import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const meetings = [
  { title: "15min", description: "15 minutes meeting" },
  { title: "30min", description: "30 minutes meeting" },
  { title: "60min", description: "60 minutes meeting" },
];

const MainContent = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div style={{ background: "#EBF4FA" }}>
        <Container maxWidth="md" component="main" className={classes.container}>
          <Typography varient="title" className={classes.title}>
            My CalendApp
          </Typography>
          <Typography>
            <NavLink
              to="/eventtypes"
              activeClassName="selected"
              activeStyle={{ color: "#F78104" }}
              className={classes.link}
            >
              EVENT TYPES
            </NavLink>
            <NavLink
              to="/scheduledevents"
              activeClassName="selected"
              activeStyle={{ color: "#F78104" }}
              className={classes.link}
            >
              SCHEDULED EVENTS
            </NavLink>
          </Typography>
        </Container>
        <Container
          maxWidth="md"
          component="main"
          className={classes.container2}
        >
          <Grid item xs={12}>
            <Avatar
              alt="John Doe"
              src="data:image/jpeg;base64,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"
              className={classes.avatar}
            />
            <Typography
              varient="h2"
              component="h1"
              className={classes.userName}
            >
              John Doe
            </Typography>
            <Typography component="h6">calendapp/John Doe</Typography>
            <Button
              variant="outlined"
              align="right"
              className={classes.button}
              href="#"
            >
              + New event type
            </Button>
          </Grid>
          {/* cards */}
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {meetings.map((meeting) => (
              <Grid item key={meeting.title} xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader title={meeting.title} />
                  <CardContent>
                    <div>
                      <Typography
                        component="h6"
                        variant="h5"
                        color="textPrimary"
                      >
                        {meeting.description}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};
const useStyles = makeStyles((theme) => ({
  container: {
    background: "#ffffff",
    marginLeft: 60,
    marginTop: 10,
  },
  container2: {
    background: "transparent",
    marginLeft: 60,
    marginTop: 30,
  },
  button: {
    background: "#ffffff",
    flexGrow: 1,
    textAlign: "right",
    textTransform: "none",
    color: "#F78104",
    borderColor: "#F78104",
    "&:hover": {
      color: "#F78104",
      borderBottom: "3px solid rgb(212, 212, 212)",
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    color: "black",
  },
  link: {
    color: "black",
    marginRight: 30,
    marginTop: 30,
    fontWeight: 500,
    textTransform: "uppercase",
    textDecoration: "none",
    "&:hover": {
      color: "#F78104",
    },
    "&:active": {
      color: "#F78104",
    },
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  userName: {
    fontSize: 15,
    fontWeight: 500,
    color: "black",
  },
}));

export default MainContent;
