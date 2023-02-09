const { object } = require("joi");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    title: String,
    content: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      require: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);
module.exports = commentSchema;
