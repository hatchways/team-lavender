const stripe = require("stripe")(process.env.STRIPE_SK);
const uuid = require("uuid");
const Users = require("../models/User");
const mongoose = require("mongoose");

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
        .then((response) => {
          // add subscription id to the user maybe move to a different function
          try {
            // update
            Users.collection.updateOne(
              {
                calendarUrl: product.calendUrl,
              },
              {
                $set: {
                  subscriptionId: response.id,
                },
              }
            );
          } catch (err) {
            console.log(err);
          }
        });
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.delete = async function (req, res) {
  url = req.body.url;
  try {
    const user = await Users.find({ calendarUrl: url }, { subscriptionId: 1 });
    await Users.collection.updateOne(
      {
        calendarUrl: url,
      },
      {
        $unset: {
          subscriptionId: "",
        },
      }
    );
    console.log(user[0]["subscriptionId"]);
    await stripe.subscriptions.del(user[0]["subscriptionId"]);
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
  return res.status(200).json({
    message: "Subscription cancelled",
  });
};

//No route to this yet can be used to check if subscription id valid
exports.retrieve = async function (req, res) {
  await stripe.subscriptions.retrieve("SubscriptionId");
};
