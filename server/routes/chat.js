const express = require("express");
const { authorizer } = require("../middleware/auth");
const { getChatAccess, getChats } = require("../controllers/chat");

const router = express.Router();
router.route("/").post(authorizer, getChatAccess).get(authorizer, getChats);

// router.route("/group").post(authorizer, createGroupChat);
// router.route("/rename").put(authorizer, renameGroup);
// router.route("/groupremove").put(authorizer, removeFromGroup);
// router.route("/groupadd").put(authorizer, addToGroup);

module.exports = router;
