const express = require("express");
const app = express();
const logHandler = require("./middleware/logs/log");
// const connectSocket = require("./controllers/socket");
require("dotenv").config();
const NotFound = require("./middleware/handler/404");
const errorHandler = require("./middleware/handler/errorHandler");
const connectDB = require("./config/db");
const cors = require("cors");
const sample = require("./routes/sample");
const userRoutes = require("./routes/user");
const OTPRoutes = require("./routes/otp");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");
const colors = require("colors");

// middleware

app.use(cors());
app.use(express.json());
app.use(logHandler);

// routes
app.use("/sample", sample);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/otp", OTPRoutes);

app.use(errorHandler);
app.use(NotFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const con = await connectDB();
    console.log(`MongoDB connected: ${con.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`${error}`.red.bold);
    process.exit();
  }
};

// connectSocket(server);

start();

const server = app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`.green.bold)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    console.log("user setup room:" + userData._id);
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room:" + room);
  });

  socket.on("delete chat", (deleteChatData) => {
    socket.in(deleteChatData.friend).emit("deleted chat", deleteChatData);
  });

  socket.on("add chat", (addChatData) => {
    console.log(addChatData);
    socket.in(addChatData.passId).emit("added chat", addChatData);
  });

  socket.on("edit message", (editedMessage) => {
    var chat = editedMessage.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == editedMessage.sender._id) return;
      socket.in(chat._id).emit("update edited", editedMessage);
    });
  });

  socket.on("delete message", (deletedMessage) => {
    var chat = deletedMessage.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == deletedMessage.sender._id) return;
      socket.in(chat._id).emit("update deleted", deletedMessage);
    });
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(chat._id).emit("message received", newMessageRecieved);
    });
  });
});
