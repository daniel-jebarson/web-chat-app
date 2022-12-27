const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const connectSocket = require("./controllers/socket");
require("dotenv").config();
const NotFound = require("./middleware/404");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const cors = require("cors");
const sample = require("./routes/sample");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const colors = require("colors");

// middleware

app.use(cors());
app.use(express.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});
// routes
app.use("/sample", sample);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.use(errorHandler);
app.use(NotFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const con = await connectDB();
    console.log(`MongoDB connected: ${con.connection.host}`.cyan.underline);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`.green.bold)
    );
  } catch (error) {
    console.log(error, red.bold);
    process.exit();
  }
};

connectSocket(server);

start();
