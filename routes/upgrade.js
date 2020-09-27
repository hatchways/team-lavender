const express = require("express");
const { GatewayTimeout } = require("http-errors");
const router = express.Router();
const upgradeController = require("../controllers/upgradeController");
const gattedRoutes = require("../middleware/gattedRoutes");

router.post("/payment", gattedRoutes, upgradeController.payment);
router.post("/delete", gattedRoutes, upgradeController.delete);
router.get("/checkSubscription", gattedRoutes, upgradeController.retrieve);
module.exports = router;
