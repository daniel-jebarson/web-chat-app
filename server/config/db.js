const { connect } = require("mongoose");

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const connectDB = () => {
  return connect(process.env.MONGO_URL, options);
};

module.exports = connectDB;
