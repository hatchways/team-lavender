const stripe = require("stripe")(process.env.STRIPE_SK);
const uuid = require("uuid");

exports.payment = function (req, res) {
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
};
