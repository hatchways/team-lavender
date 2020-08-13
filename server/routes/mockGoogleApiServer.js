const express = require("express");
const router = express.Router();

router.get("/:username/availability", function (req, res, next) {

    // console.log("-----------",req.params)
    // console.log("------------",req.query)

  res.status(200).send({username:req.params.username, ...req.query});
});

module.exports = router;
