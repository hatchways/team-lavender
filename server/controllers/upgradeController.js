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
      console.log(customer);
      stripe.charges.create({
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: product.name,
        recurring: true,
      });
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
