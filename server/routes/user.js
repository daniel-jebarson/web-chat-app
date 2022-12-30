const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/user.js");
const { sampleGet } = require("../controllers/sample");
const { authorizer } = require("../middleware/auth/auth");
const router = express.Router();

router.route("/").post(registerUser).get(authorizer, getAllUsers);
router.route("/login").post(loginUser);

module.exports = router;
