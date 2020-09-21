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
import Box from "@material-ui/core/Box";
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
      .get("/user/findUser", {
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
      .get("/meeting/", {
        params: {
          id: user._id,
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
  const RandomColor = () => {
    const colors = [
      "#90EE90",
      "#FFA07A",
      "#FFB6C1",
      "#ff5050",
      "#00cc99",
      "#ffff66",
      "red",
      "black",
      "green",
      "blue",
      "#cc0099",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
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
              activeStyle={{
                color: "#F78104",
                borderBottom: "5px solid #F78104",
              }}
              className={classes.link}
            >
              EVENT TYPES
            </NavLink>
            <NavLink
              to="/scheduledevents"
              activeClassName="selected"
              className={classes.link}
              activeStyle={{
                color: "#F78104",
                borderBottom: "5px solid #F78104",
              }}
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
              style={{ display: "inline-block", height: 35, width: 35 }}
            />
            <div style={{ display: "inline-block", marginLeft: 20 }}>
              <Typography className={classes.userName}>{user.name}</Typography>
              <Typography>calendapp/{user.calendarUrl}</Typography>
            </div>
            <Button
              style={{
                display: "inline-block",
                marginLeft: 30,
                verticalAlign: "bottom",
              }}
              variant="outlined"
              className={classes.button}
              href="#"
              onClick={OpenCreateMeetingDialog}
            >
              + New event type
            </Button>
          </Grid>
          {/* cards */}
        </Container>
        <hr
          style={{
            width: "90%",
            marginBottom: 20,
          }}
        ></hr>
        <Container component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {meetings.map((meeting) => (
              <Grid item key={meeting.eventURL} xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardContent
                    style={{
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <div
                      className={classes.dividerTop}
                      style={{
                        background: RandomColor(),
                      }}
                    />

                    <Typography
                      component="h6"
                      variant="h5"
                      color="textPrimary"
                      style={{
                        textAlign: "center",
                        paddingTop: 20,
                        textTransform: "uppercase",
                      }}
                    >
                      {meeting.eventURL}
                    </Typography>

                    <Divider className={classes.dividerInCardContent} />
                    <div style={{ display: "block", position: "relative" }}>
                      <CardHeader
                        style={{ display: "inline-block" }}
                        title={meeting.duration + " min "}
                      />
                      <Button
                        style={{
                          display: "inline-block",
                          position: "absolute",
                          right: 5,
                          marginTop: 15,
                        }}
                        variant="outlined"
                        className={classes.button}
                      >
                        COPY LINK
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
    "-webkit-box-shadow": "0px 5px 0px 0px rgba(196,196,196,0.5)",
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
    paddingBottom: 3,
    "&:hover": {
      color: "#F78104",
      borderBottom: "5px solid #808080",
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
    height: 7,
    width: "100%",
  },
  dividerInCardContent: {
    margin: "30px 10px 10px 15px",
  },
}));

export default MainContent;
