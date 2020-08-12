const express = require("express");
const router = express.Router();

router.get("/welcome", function (req, res, next) {
  
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.get("/auth", function(req, res, next) {
  console.log("----------",process.env.CLIENT_ID)

  if (
    process.env.CLIENT_ID
  )
    res.status(200).send({clientID:process.env.CLIENT_ID});
  else
    res.status(400).send({
      response: `oAuth ClinetID is not included in .env`
    });
});

module.exports = router;
