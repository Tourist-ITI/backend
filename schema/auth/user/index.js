//core modules
const mongoose = require("mongoose");

//variables
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
  },
  phone: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = userSchema;
