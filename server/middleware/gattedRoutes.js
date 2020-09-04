const jwt = require("jasonwebtoken");

module.exports = (req, res, next) => {
  try {
    token = req.headers.authenticate;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json("Invalid credentials");
  }
};
