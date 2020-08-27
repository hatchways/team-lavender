const stripe = require("stripe")(process.env.STRIPE_SK);
const Users = require("../models/User");

exports.payment = async function (req, res) {
  const { product, token } = req.body;
  //create customer->create subscription->add subscriptionId to User database
  const customer = createCustomer(token);
  const response = customer
    .then((customer) => {
      console.log("customer", customer);
      return createSubscription(customer, product);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
  const message = response
    .then((response) => {
      console.log("response", response);
      return addSubcriptinIdToDb(response, product);
    })
    .catch((err) => {
      return res.status(500).json("something went wrong", err);
    });
  message.then((message) => {
    return res.status(200).json(message);
  });
};

exports.delete = async function (req, res) {
  url = req.body.url;
  try {
    const user = await Users.find({ calendarUrl: url }, { subscriptionId: 1 });
    await Users.collection.updateOne(
      { calendarUrl: url },
      {
        $unset: { subscriptionId: "" },
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

async function createCustomer(token) {
  return await stripe.customers.create({
    email: token.email,
    source: token.id,
  });
}

async function createSubscription(customer, product) {
  return await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: product.price,
        quantity: 1,
      },
    ],
  });
}

async function addSubcriptinIdToDb(response, product) {
  console.log("response", response, product);
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
    return "Customer and subscription created";
  } catch (err) {
    stripe.subscriptions.del(response.id);
    return "Customer created,subscription added and cancelled contact customer service for refund";
  }
}
