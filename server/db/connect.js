const { connect } = require("mongoose");
// import { connect } from "mongoose";
// const {
//   // Attempts to connect to MongoDB and then tries to connect locally:)
//   MONGO_URI = "mongodb://localhost:27017/".concat("webapp"),
// } = process.env;

// console.log(MONGO_URI);

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectDB = (url) => {
  return connect(url, options);
};

module.exports = connectDB;
