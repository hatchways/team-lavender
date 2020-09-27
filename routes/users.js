const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const sendEmail = require("../uitl/email/sendEmail");
const gattedRoutes = require("../middleware/gattedRoutes");

router.get("/is_unique", gattedRoutes, userController.checkUniqueUrl);

router.put("/:id", gattedRoutes, userController.updateUserInfo);

// not used anywhere
router.post("/signup", gattedRoutes, userController.signUpUser);

//used only on dashboard will be removed in future
router.get("/findUser", gattedRoutes, userController.findByUrl);

module.exports = router;
