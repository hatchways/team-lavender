const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51HJRdeB2HY6qlBJzsa1OP1JDhvYohU5K7gSEhjKSLCjOZlYL9s7kuzJ1AdOMGzG6LkqZhQHTW1rcJ8D8iktzmw5k00ONGnd4RX"
);
const uuid = require("uuid");
router.post("/payment", (req, res) => {
  const { products, token } = req.body;
  console.log("Prodcuts", products);
  console.log("Price", token.price);
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: products.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_eamil: token.email,
          description: products.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
