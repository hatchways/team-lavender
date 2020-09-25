const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    token = req.headers.authenticate;
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) return res.status(401).send("Token is invalid");
      else {
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};
