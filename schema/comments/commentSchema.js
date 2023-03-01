const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    title: String,
    content: String,
    rating:Number,
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
