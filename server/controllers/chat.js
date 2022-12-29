const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const ChatModel = require("../models/Chat");
const UserModel = require("../models/User");

const getChatAccess = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new CustomError("UserId param not found", 400);
  }

  let isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
      {
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "username gmail friends image",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await ChatModel.create(chatData);
      const FullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");
      res.status(200).send(FullChat);
    } catch (err) {
      throw new CustomError(err.message, 400);
    }
  }
});

const getChats = asyncHandler(async (req, res) => {
  try {
    ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await UserModel.populate(results, {
          path: "latestMessage.sender",
          select: "username image gmail friends",
        });
        res.status(200).send(results);
      });
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

module.exports = { getChatAccess, getChats };
