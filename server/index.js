const express = require("express");
const app = express();
require("dotenv").config();
const server = require("http").createServer(app);
const NotFound = require("./middleware/404");
const asyncWrapper = require("./middleware/asyncWrapper");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./db/connect");
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST", "PUT"],
//   },
// });
// io.on("connection", (socket) => {
//   console.log("Connection made " + socket.id);
//   socket.on("send_message", (data) => {
//     console.log(`Sent fromm client to server :${JSON.stringify(data)}`);
//     io.emit("receive_message", `Server sent ${JSON.stringify(data)}`);
//   });
// });

app.get("/", (req, res) => {
  res.send("hello");
});

// middleware

app.use(express.static("./public"));
app.use(express.json());
app.use(errorHandler);
app.use(NotFound);

// routes

// app.use("/api/v1/tasks", tasks);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connected to db");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

// server.listen(5000, () => {
//   console.log(`Server running on http://localhost:5000/`);
// });
