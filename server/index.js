const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const connectSocket = require("./controllers/socket");
require("dotenv").config();
const NotFound = require("./middleware/404");
const asyncWrapper = require("./middleware/asyncWrapper");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./db/connect");
const cors = require("cors");
const sample = require("./routes/sample");
// middleware

// app.use(express.static("./public"));
// app.use(express.json());

app.use(cors());

// routes
app.use("/sample", sample);
// app.use("/api/v1/tasks", tasks);

app.use(errorHandler);
app.use(NotFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connected to db");
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

connectSocket(server);

start();
