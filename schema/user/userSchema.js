// core modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    ssn: String,
    photo: String,
    cover_photo: String,
    role: {
      type: String,
      required: true,
    },
    bio: String,
    city: String,
    favorite_organizer: Array,
    visited_tours: Array,
    payment_method: Array,
    cash: Number,
    currency: String,
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
module.exports = userSchema;
