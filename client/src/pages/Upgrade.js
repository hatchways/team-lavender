import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function Upgrade() {
  const [product, setProduct] = useState({
    name: "Premium",
    price: 10.99,
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    axios
      .post("http://localhost:3001/upgrade/payments", body)
      .then((response) => console.log("Response", response))
      .catch((err) => console.log("Error: " + err));
  };

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51HJRdeB2HY6qlBJzpk3STRMWboVUaF8iAZ4lAimyidoWISadlONHPNhu0FWXOGSCyRN4O6erHdkVAvQrXeO1Aqpk00QbtrqfIZ"
        token={makePayment}
        name="upgrade"
        amount="1099"
      ></StripeCheckout>
    </div>
  );
}

export default Upgrade;
