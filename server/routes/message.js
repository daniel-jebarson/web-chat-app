const express = require("express");
const { authorizer } = require("../middleware/auth/auth");
const {
  messageSender,
  getAllMessages,
  editMessage,
  deleteMessage,
} = require("../controllers/message");
const router = express.Router();

router.route("/").post(authorizer, messageSender);
router
  .route("/:id")
  .post(authorizer, getAllMessages)
  .put(authorizer, editMessage)
  .delete(authorizer, deleteMessage);

module.exports = router;
