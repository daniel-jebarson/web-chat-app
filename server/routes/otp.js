const express = require("express");
const { authorizer } = require("../middleware/auth/auth");
const { sendOTP, verifyOTP } = require("../controllers/otp");

const router = express.Router();

router.route("/:id/verify/:token").get(verifyOTP);
router.route("/send/:id").post(authorizer, sendOTP);

module.exports = router;
