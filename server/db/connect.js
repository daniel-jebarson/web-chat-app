const { connect } = require("mongoose");

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectDB = (url) => {
  return connect(url, options);
};

module.exports = connectDB;
