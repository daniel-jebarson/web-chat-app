const express = require("express");
const { authorizer } = require("../middleware/auth/auth");
const {
  messageSender,
  getAllMessages,
  editMessage,
} = require("../controllers/message");
const router = express.Router();

router.route("/").post(authorizer, messageSender);
router
  .route("/:id")
  .post(authorizer, getAllMessages)
  .put(authorizer, editMessage);

module.exports = router;
