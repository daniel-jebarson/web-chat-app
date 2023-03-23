const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
    expireAfterSeconds: 600,
  }
);

module.exports = mongoose.model("token", tokenSchema);
