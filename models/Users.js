import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    gmail: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    friends: { type: [String] },
  },
  {
    timestamps: true,
  }
);

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);
