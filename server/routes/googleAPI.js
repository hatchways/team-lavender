const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  "871373961261-rjej65g97dc3o6jiuflq6s2gp5v9ptut.apps.googleusercontent.com",
  "XauLtqJv2LbkiRd7nTMhRnQq",
  "http://localhost:3000"
);

router.get("/:username/availability", function (req, res, next) {
  console.log("---------------");
  res.status(200).send({
    username: req.params.username,
    ...req.query,
  });
});

router.get("/credentials", async function (req, res, next) {
  //get tokec, refresh-token,expire at
  oAuth2Client.getToken(req.query.code, (err, token) => {
    if (err)
      return console.error(
        "Error retrieving access token-------------------",
        err
      );
    oAuth2Client.setCredentials(token);
    console.log(token);
  });
  //TO DO : check database for user, and if exists update, if not add

  
});

module.exports = router;
