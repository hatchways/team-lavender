import React, { useContext } from "react";
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
import Divider from "@material-ui/core/Divider"
import CreateNewEventDialog from "../components/CreateNewEventDialog"
import Meeting from "../utils/createMeeting"

import UserContext from "../utils/userContext";


const meetings = [
  { title: "15min", description: "15 minutes meeting" },
  { title: "30min", description: "30 minutes meeting" },
  { title: "60min", description: "60 minutes meeting" },
];

const MainContent = () => {
  const { user } = useContext(UserContext);

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const OpenCreateMeetingDialog = () => {
    setOpen(true);
  };
  const CloseCreateMeetingDialog = () => {
    setOpen(false);
  };
  const CreateMeeting = async (duration, name, type, eventURL) => {
    const data = {
      duration : duration,
      userId : user._id,
      eventURL : eventURL
    }
    
    const response = await Meeting.createMeeting(data)
    const {eventUrlExist, message} = response.data;
    if (eventUrlExist) {
      alert(message)
    } else {
      setOpen(false);
    }
  };

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
              src={user.avatarUrl}
              className={classes.avatar}
            />
            <Typography
              varient="h2"
              component="h1"
              className={classes.userName}
            >
              {user.name}
            </Typography>
            <Typography component="h6">calendapp/{user.calendarUrl}</Typography>
            <Button
              variant="outlined"
              align="right"
              className={classes.button}
              href="#"
              onClick={OpenCreateMeetingDialog}
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
                    <Divider className={classes.dividerInCardContent} />
                    <div className={classes.belowDividerinCardContent}>
                      <CardHeader title={meeting.title} />
                      <Button variant="outlined" className={classes.button}>
                        CREATE LINK
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {open === true && (
          <CreateNewEventDialog
            open={open}
            close={CloseCreateMeetingDialog}
            create={CreateMeeting}
          />
        )}
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
      background: "#F78104",
      color: "white",
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
  dividerInCardContent: {
    margin: "30px auto",
  },
  BelowDividerinCardContent: {
    display: "flex",
  },
}));

export default MainContent;
