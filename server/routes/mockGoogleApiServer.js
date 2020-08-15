const express = require("express");
const router = express.Router();
// import asyncLoad from 'react-async-loader'; 


router.get("/:username/availability", function (req, res, next) {

  gapi.load('client:auth2', initClient);



  
console.log("---------------")
  gapi.client
    .init({
      apiKey: "AIzaSyAfa2P2EOmWhp2_vGQC1JsCuyTVkvtE08s",
      clientId:
        "871373961261-rjej65g97dc3o6jiuflq6s2gp5v9ptut.apps.googleusercontent.com",
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      ],
      scope:
        "https://www.googleapis.com/auth/calendar.events",
    })
    .then(function () {
      console.log("here")
      gapi.client.calendar.events
        .list({
          calendarId: "primary",
        })
        .then(function (response) {
          console.log("routes",response);
        });
    })
    .then(() =>
      res.status(200).send({ username: req.params.username, ...req.query })
    );

    // res.status(200).send({ username: req.params.username, ...req.query })

});

module.exports = router;
