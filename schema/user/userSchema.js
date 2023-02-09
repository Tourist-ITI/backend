// core modules
const { number } = require("joi");
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
    },
    ssn: {
      type: String,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    favorite_organizer: {
      type: Array,
    },
    visited_tours: {
      type: Array,
    },
    payment_method: {
      type: Array,
    },
    cash: {
      type: number,
    },
    currency: {
      type: String,
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
module.exports = userSchema;
