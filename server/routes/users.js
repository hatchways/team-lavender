const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id/is_unique", userController.checkUniqueUrl);

router.put("/:id", userController.updateUserInfo);

module.exports = router;
