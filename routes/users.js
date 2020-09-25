const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const sendEmail = require("../uitl/email/sendEmail");
const gattedRoutes = require("../middleware/gattedRoutes");

router.get("/is_unique", userController.checkUniqueUrl);

router.put("/:id", userController.updateUserInfo);

router.post("/signup", userController.signUpUser);

//send it fetch request as (user/findUser?calendarUrl=${calendarUrl})
router.get("/findUser", userController.findByUrl);

module.exports = router;
