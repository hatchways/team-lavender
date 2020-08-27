const stripe = require("stripe")(process.env.STRIPE_SK);
const uuid = require("uuid");
const Users = require("../models/User");
const mongoose = require("mongoose");

exports.payment = async function (req, res) {
  const { product, token } = req.body;
  console.log("Product", product);
  console.log("Token", token);
  //create customer->create subscription->add subscriptionId to User database
  await stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
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
          try {
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
            return res.status(200).json("Customer and subscription added");
          } catch (err) {
            stripe.subscriptions.del(response.id);
            return res
              .status(500)
              .json(
                "Customer created,subscription added and cancelled contact customer service for refund"
              );
          }
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
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
    await stripe.subscriptions
      .del(user[0]["subscriptionId"])
      .then(() => {
        return res.status(200).json("Subscription cancelled");
      })
      .catch((err) => {
        return res
          .status(500)
          .json(
            "Subscription removed from calendapp, but not cancelled. Contact customer service for assistance"
          );
      });
  } catch (err) {
    return res.status(400).json({ massage: err });
  }
};

//No route to this yet can be used to check if subscription id valid
exports.retrieve = async function (req, res) {
  await stripe.subscriptions.retrieve("SubscriptionId");
};
