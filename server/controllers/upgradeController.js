const stripe = require("stripe")(process.env.STRIPE_SK);
const uuid = require("uuid");

exports.payment = async function (req, res) {
  const { product, token } = req.body;
  console.log("Prodcut", product);
  console.log("Token", token);
  await stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      console.log("customer", customer);
      stripe.subscriptions
        .create({
          customer: customer.id,
          items: [
            {
              price: "price_1HJrcVB2HY6qlBJzcULTCZMk",
              quantity: 1,
            },
          ],
        })
        .then((res) => {
          console.log("subscription");
        });
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
