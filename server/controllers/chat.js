const unique = require("unique-words");
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

const getStats = (data = []) => {
  //no.of messages,no.of.words,no.of.edited message, deleted message, average message length, unique words, character in longest message
  let result = {};
  result["total"] = {
    words: 0,
    edited: 0,
    deleted: 0,
    tot_Char: 0,
    longest: 0,
    long_message: "",
    unique: "",
    messages: 0,
    average: 0,
  };
  for (let i = 0; i < data.length; i++) {
    let username = data[i]["sender"]["username"];
    if (!result.hasOwnProperty(username)) {
      result[username] = {
        words: 0,
        edited: 0,
        deleted: 0,
        tot_Char: 0,
        longest: 0,
        long_message: "",
        unique: "",
        messages: 0,
        average: 0,
      };
    }

    if (data[i]["isDeleted"]) {
      result[username]["deleted"]++;
    } else {
      let content = data[i]["content"];
      result[username]["unique"] += content + " ";
      if (result[username]["longest"] < content.length) {
        result[username]["longest"] = content.length;
        result[username]["long_message"] = content;
      }
      let words = content.split(" ");
      result[username]["words"] += words.length;
      result[username]["tot_Char"] += content.length;
      ++result[username]["messages"];

      if (!(data[i].createdAt === data[i].updatedAt)) {
        result[username]["edited"] += 1;
      }
    }
    result[username]["average"] = Math.round(
      result[username]["tot_Char"] / result[username]["messages"]
    );
  }
  let keys = Object.keys(result["total"]);
  let usernames = Object.keys(result);
  usernames.splice(usernames.indexOf("total"), 1);
  for (let username of usernames) {
    for (let key of keys) {
      if (key === "longest" || key === "long_message") {
        if (result["total"]["longest"] < result[username]["longest"]) {
          result["total"]["longest"] = result[username]["longest"];
          result["total"]["long_message"] = result[username]["long_message"];
        }
      } else if (key === "unique") {
        result["total"][key] += " " + result[username][key];
      } else {
        result["total"][key] += result[username][key];
      }
    }

    let temp = unique(result[username]["unique"].trim());
    result[username]["unique"] = temp.length;
  }
  const tot = result["total"]["unique"].trim();
  result["total"]["average"] = Math.round(
    tot.length / result["total"]["messages"]
  );
  result["total"]["unique"] = unique(tot).length;

  return result;
};

const getChatStats = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    let data = await MessageModel.find({ chat: id });
    if (data.length === 0) {
      res.status(200).json(data);
      return;
    }
    // console.log(data);
    data = await MessageModel.find({ chat: id }).populate(
      "sender",
      "username image"
    );
    // res.status(200).json(data);
    res.status(200).json(getStats(data));
  } catch (err) {
    console.log(err);
    throw new CustomError("Unable to fetch messages", 400);
  }
});

module.exports = { getChatAccess, getPrivateChats, deleteChat, getChatStats };
