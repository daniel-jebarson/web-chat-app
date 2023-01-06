const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const ChatModel = require("../models/Chat");
const UserModel = require("../models/User");
const MessageModel = require("../models/Message");

const deleteChat = asyncHandler(async (req, res) => {
  const { chatId } = req.body;
  // console.log(req.user._id);
  if (!chatId) {
    throw new CustomError("UserId param not found", 400);
  }
  try {

    let isDeleted = await MessageModel.deleteMany({
      isGroupChat: false,
      chat: chatId,
    });

    console.log("Number of messages deleted : " + isDeleted.deletedCount);
    isDeleted = await ChatModel.deleteOne({
      isGroupChat: false,
      _id: chatId,
    });
    if (isDeleted) {
      res.status(200).json({
        success: true,
        msg: "Deletion success",
      });
    } else {
      throw new CustomError("Nothing to delete", 400);
    }
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

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

const getPrivateChats = asyncHandler(async (req, res) => {
  try {
    ChatModel.find({
      users: { $elemMatch: { $eq: req.user._id } },
      isGroupChat: false,
    })
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

module.exports = { getChatAccess, getPrivateChats, deleteChat };
