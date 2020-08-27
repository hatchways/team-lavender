const express = require("express");
const router = express.Router();
const upgradeController = require("../controllers/upgradeController");

router.post("/payment", upgradeController.payment);
router.post("/delete", upgradeController.delete);

module.exports = router;
