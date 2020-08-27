import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function SubcribeBtn(props) {
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

export default SubcribeBtn;
