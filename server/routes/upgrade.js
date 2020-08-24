const express = require("express");
const router = express.Router();
const upgradeController = require("../controllers/upgradeController");

router.post("/payment", upgradeController.payment);

module.exports = router;
