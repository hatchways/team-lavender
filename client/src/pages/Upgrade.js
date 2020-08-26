import React from "react";
import SubscribeBtn from "../components/subscriptionBtn";
import SubscribeDeleteBtn from "../components/subscriptionDeleteBtn";

function Upgrade() {
  return (
    <div>
      <SubscribeBtn type="Premium" />
      <SubscribeBtn type="Professional" />
      <SubscribeDeleteBtn />
    </div>
  );
}

export default Upgrade;
