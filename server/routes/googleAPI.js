const express = require("express");
const router = express.Router();
const controller = require("../controllers/googleApiController")


// router.get("/:username/availability", function (req, res, next) {
//   console.log("---------------");
//   res.status(200).send({
//     username: req.params.username,
//     ...req.query,
//   });
// });

router.get("/authentication", controller.authenticateUser)

//TO DO: 

module.exports = router;
