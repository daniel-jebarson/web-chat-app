const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const MessageModel = require("../models/Message");
const UserModel = require("../models/User");
const ChatModel = require("../models/Chat");
// const chats = require("../data/data");

const editMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new CustomError("Invalid data", 400);
  }
  try {
    const data = await MessageModel.findByIdAndUpdate(
      id,
      {
        content: content,
      },
      { new: true }
    )
      .populate("sender", "username image")
      .populate("chat");
    res.status(200).json(data);
  } catch (err) {
    throw new CustomError("Unable to edit message", 400);
  }
});

const deleteMessage=asyncHandler(async(req,res)=>{
  const { id } = req.params;

  try {
    const data = await MessageModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true }
    )
      .populate("sender", "username image")
      .populate("chat");
    res.status(200).json(data);
  } catch (err) {
    throw new CustomError("Unable to delete message", 400);
  }
})

const messageSender = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    //   console.log("Invalid data");
    throw new CustomError("Invalid data", 400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
    isDeleted: false,
  };

  try {
    var message = await MessageModel.create(newMessage);

    message = await message.populate("sender", "username image");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "username image gmail",
    });

    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.status(200).json(message);
  } catch (error) {
    throw new CustomError("Unable to store message", 400);
  }
});

const getAllMessages = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let data = await MessageModel.find({ chat: id });
    if (data.length === 0) {
      res.status(200).json(data);
      return;
    }
    // console.log(data);
    data = await MessageModel.find({ chat: id })
      .populate("sender", "username image")
      .populate("chat");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    throw new CustomError("Unable to fetch messages", 400);
  }
});

module.exports = {
  messageSender,
  getAllMessages,
  editMessage,
  deleteMessage
};
