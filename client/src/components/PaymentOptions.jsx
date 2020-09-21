import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import SubscribeBtn from "../components/subscriptionBtn";
import SubscribeDeleteBtn from "../components/subscriptionDeleteBtn";
import axios from "axios";
import UserContext from "../utils/userContext";

const PaymentOptions = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [url, setUrl] = useState(
    window.location.pathname.replace("/upgrade", "").replace("/", "")
  );
  const [currentPlan, setCurrentPlan] = useState("free basic plan");
  useEffect(() => {
    axios
      .get("/upgrade/checkSubscription", {
        params: {
          calendarUrl: user.calendarUrl,
        },
      })
      .then((response) => {
        console.log("Response", response.data.plan.amount);
        if (response.data.plan.amount == 1999) {
          setCurrentPlan("professional plan");
        } else if (response.data.plan.amount == 999) {
          setCurrentPlan("premium plan");
        }
      })
      .catch((err) => console.log("Error: " + err));
  });
  return (
    <React.Fragment>
      <div style={{ background: "#EBF4FA" }}>
        <Container maxWidth="md" component="main">
          <div className={classes.container}>
            <Typography
              component="h3"
              variant="h3"
              color="textPrimary"
              className={classes.title}
            >
              Upgrade your account
            </Typography>
            <Typography component="h4" variant="h5" color="textPrimary">
              {"You are on " + currentPlan}
            </Typography>
          </div>
          <Grid container spacing={5} alignItems="center" justify="center">
            <Grid item key="Premium" xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    className={classes.cardLineOne}
                    style={{ color: "#800080" }}
                  >
                    Premium
                  </Typography>
                  <Typography
                    className={classes.cardLineTwo}
                    color="textPrimary"
                  >
                    $9.99/ Month
                  </Typography>
                  {currentPlan === "free basic plan" && (
                    <SubscribeBtn type="Premium" price="999" />
                  )}
                  {currentPlan === "premium plan" && <SubscribeDeleteBtn />}
                  {currentPlan === "professional plan" && (
                    <div>Cancel professional plan first</div>
                  )}
                  <Divider className={classes.dividerInCardContent} />
                  <div className={classes.belowDividerinCardContent}>
                    <ul>
                      <li>60 minute meetings only</li>
                      <li>Unlimited appointments</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item key="Professional" xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    className={classes.cardLineOne}
                    style={{ color: "#32CD32" }}
                  >
                    Professional
                  </Typography>
                  <Typography
                    className={classes.cardLineTwo}
                    color="textPrimary"
                  >
                    $19.99/ Month
                  </Typography>
                  {currentPlan === "free basic plan" && (
                    <SubscribeBtn type="Professional" price="1999" />
                  )}
                  {currentPlan === "professional plan" && (
                    <SubscribeDeleteBtn />
                  )}
                  {currentPlan === "premium plan" && (
                    <div>Cancel premium plan first</div>
                  )}

                  <Divider className={classes.dividerInCardContent} />
                  <div className={classes.belowDividerinCardContent}>
                    <ul>
                      <li>Unlimited meetings</li>
                      <li>Unlimited appointments</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Grid
          container
          spacing={5}
          alignItems="center"
          justify="center"
          style={{ marginTop: 30 }}
        ></Grid>
      </div>
    </React.Fragment>
  );
};
const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 50,
    fontWeight: 500,
    color: "black",
  },
  card: {
    "-webkit-box-shadow": "1px 1px 10px 3px rgba(196,196,196,1)",
    "&:hover": {
      "-webkit-box-shadow": "5px 5px 10px 3px rgba(196,196,196,1)",
    },
  },
  cardContent: {
    textAlign: "center",
  },
  cardLineOne: {
    fontSize: 30,
    fontWeight: 500,
  },
  cardLineTwo: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 15,
  },
  dividerInCardContent: {
    margin: "30px auto",
  },
  BelowDividerinCardContent: {
    display: "flex",
    textAlign: "right",
  },
}));

export default PaymentOptions;
