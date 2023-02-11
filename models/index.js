const mongoose = require("mongoose");

//app schema
const userSchema = require("../schema/user/userSchema");
const tourSchema = require("../schema/tours/toursSchema");
const commentSchema = require("../schema/comments/commentSchema");

//app models
const userModel = mongoose.model("user", userSchema);
const tourModel = mongoose.model("tour", tourSchema);
const commentModel = mongoose.model("comment", commentSchema);

module.exports = {
  userModel,
  tourModel,
  commentModel,
};
