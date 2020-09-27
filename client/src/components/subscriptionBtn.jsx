import React, { useState, useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../utils/userContext";

function SubcribeBtn(props) {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  function setPrice() {
    switch (props.type) {
      case "Professional":
        return "price_1HJrcVB2HY6qlBJzcULTCZMk";
      case "Premium":
        return "price_1HJrb4B2HY6qlBJzSdpZNoTM";
    }
  }

  const [product, setProduct] = useState({
    name: props.type,
    price: setPrice(),
    calendUrl: user.calendarUrl,
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    axios
      .post("/upgrade/payment", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authenticate: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        console.log("Response", response);
        alert(response.data);
        window.location.reload();
      })
      .catch((err) => console.log("Error: " + err));
  };

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51HJRdeB2HY6qlBJzpk3STRMWboVUaF8iAZ4lAimyidoWISadlONHPNhu0FWXOGSCyRN4O6erHdkVAvQrXeO1Aqpk00QbtrqfIZ"
        token={makePayment}
        name="Upgrade"
        amount={props.price}
      >
        <Button variant="outlined" align="right" className={classes.button}>
          Upgrade
        </Button>
      </StripeCheckout>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
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
}));

export default SubcribeBtn;
