const stripe = require("stripe")(process.env.STRIPE_SK);
const uuid = require("uuid");
const Users = require("../models/User");

exports.payment = async function (req, res) {
  const { product, token } = req.body;
  console.log("Product", product);
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
              price: product.price,
              quantity: 1,
            },
          ],
        })
        .then((res) => {
          console.log("subscription", "SubscriptionId", res.id);
        });
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.delete = async function (req, res) {
  stripe.subscriptions.del("SubscriptionId");
};
