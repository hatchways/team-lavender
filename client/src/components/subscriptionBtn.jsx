import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

function SubcribeBtn(props) {
  const classes = useStyles();

  function setPrice() {
    switch (props.type) {
      case "Professional":
        return "price_1HJrcVB2HY6qlBJzcULTCZMk";
      case "Premium":
        return "price_1HJrb4B2HY6qlBJzSdpZNoTM";
    }
  }

  const [url, setUrl] = useState(
    window.location.pathname.replace("/upgrade", "").replace("/", "")
  );

  const [product, setProduct] = useState({
    name: props.type,
    price: setPrice(),
    calendUrl: url,
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    axios
      .post("http://localhost:3001/upgrade/payment", body)
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
