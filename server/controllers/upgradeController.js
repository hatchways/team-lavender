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
  //get req.url-> get subID and delete from db
  await stripe.subscriptions.del("SubscriptionId");
};
exports.retrieve = async function (req, res) {
  await stripe.subscriptions.retrieve("SubscriptionId");
};
