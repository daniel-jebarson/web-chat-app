import { connect } from "mongoose";
const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = "mongodb://localhost:27017/".concat("webapp"),
} = process.env;

console.log(MONGO_URI);

const options = {
  useUnifiedTopology: true,
};

export const connectToDatabase = () => connect(MONGO_URI, options);
