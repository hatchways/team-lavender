import React, { useContext, useState, useEffect } from "react";
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
import Divider from "@material-ui/core/Divider";
import CreateNewEventDialog from "../components/CreateNewEventDialog";
import Meeting from "../utils/createMeeting";
import UserContext from "../utils/userContext";
import axios from "axios";

const MainContent = () => {
  const { user } = useContext(UserContext);

  const classes = useStyles();

  const [url, setUrl] = useState(window.location.pathname.replace("/", ""));
  const [userId, setUserId] = useState("");
  const [meetings, setMeetings] = useState([]);
  console.log(user);

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/findUser", {
        params: {
          calendarUrl: url,
        },
      })
      .then((response) => {
        console.log(response.data._id);
        setUserId(response.data._id);
      })
      .catch((err) => console.log("Error: " + err));

    axios
      .get("http://localhost:3001/meeting/", {
        params: {
          id: userId,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMeetings(response.data.meetingList);
      })
      .catch((err) => console.log("Error: " + err));
  }, [userId]);

  const [open, setOpen] = React.useState(false);
  const OpenCreateMeetingDialog = () => {
    setOpen(true);
  };
  const CloseCreateMeetingDialog = () => {
    setOpen(false);
  };
  const CreateMeeting = async (duration, name, type, eventURL) => {
    const data = {
      duration: duration,
      userId: userId,
      eventURL: eventURL,
    };

    const response = await Meeting.createMeeting(data);
    const { eventUrlExist, message } = response.data;
    if (eventUrlExist) {
      alert(message);
    } else {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <div style={{ background: "#EBF4FA" }}>
        <div className={classes.container}>
          <Typography varient="title" className={classes.title}>
            My CalendApp
          </Typography>
          <Typography style={{ marginLeft: 80, marginTop: 20 }}>
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
        </div>
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
              <Grid item key={meeting.eventURL} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Divider className={classes.dividerTop} />
                    <div>
                      <Typography
                        component="h6"
                        variant="h5"
                        color="textPrimary"
                      >
                        {meeting.eventURL}
                      </Typography>
                    </div>
                    <Divider className={classes.dividerInCardContent} />
                    <div className={classes.belowDividerinCardContent}>
                      <CardHeader title={meeting.duration} />
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
    flexGrow: 1,
    marginTop: 10,
  },
  container2: {
    background: "transparent",
    marginLeft: 60,
    marginTop: 30,
    marginBottom: 30,
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
    marginTop: 40,
    marginLeft: 80,
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
  card: {
    "-webkit-box-shadow": "1px 1px 10px 3px rgba(196,196,196,1)",
    "&:hover": {
      "-webkit-box-shadow": "5px 5px 10px 3px rgba(196,196,196,1)",
    },
  },
  userName: {
    fontSize: 15,
    fontWeight: 500,
    color: "black",
  },
  dividerTop: {
    color: "red",
    height: 4,
    width: "100%",
  },
  dividerInCardContent: {
    margin: "30px auto",
  },
  BelowDividerinCardContent: {
    display: "flex",
  },
}));

export default MainContent;
