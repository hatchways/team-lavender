const express = require("express");
const { GatewayTimeout } = require("http-errors");
const router = express.Router();
const upgradeController = require("../controllers/upgradeController");
const gattedRoutes = require("../middleware/gattedRoutes");

router.post("/payment", upgradeController.payment);
router.post("/delete", upgradeController.delete);
router.get("/checkSubscription", upgradeController.retrieve);
module.exports = router;
