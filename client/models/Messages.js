import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      lowercase: true,
      trim: true,
    },
    sender: {
      type: String,
      trim: true,
    },
    receiver: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Messages =
  mongoose.models.Messages || mongoose.model("Messages", MessageSchema);
