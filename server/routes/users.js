const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const sendEmail = require("../uitl/email/sendEmail")

router.get("/is_unique", userController.checkUniqueUrl);

router.put("/:id", userController.updateUserInfo);

router.post("/signup", userController.signUpUser);

router.post("/email", function(req,res) {
    console.log("passing")
    sendEmail.sendConfirmEmail("welcome", "benjaminlee.kr@gmail.com")
});


module.exports = router;
