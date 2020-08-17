const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/user/:id/is_unique", userController.checkUniqueUrl);

router.put("/user/:id", userController.updateUserInfo);

module.exports = router;