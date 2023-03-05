const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { createComment } = require("../../controllers/comments/create_comment");
const {
  deleteOneComment,
} = require("../../controllers/comments/delete_comment");
const { getAllComments } = require("../../controllers/comments/get_all");

const {
  getTourComments,
} = require("../../controllers/comments/get_tour_coments");
const {
  getUserComments,
} = require("../../controllers/comments/get_user_comments");
const { updateComment } = require("../../controllers/comments/update_comment");
const { validComment } = require("../../validation/comment");

const commentRouter = express.Router();

//create comment
commentRouter.post("/:tourID", protect, validComment, createComment);
//update comment
commentRouter.put("/:commentID", protect, validComment, updateComment);
//delete comment
commentRouter.delete("/:commentID", protect, deleteOneComment);
//get user comments
commentRouter.get("/:userID", getUserComments);
//get tour comments
commentRouter.get("/:tourID", getTourComments);
//get all comments
commentRouter.get("/", getAllComments);

module.exports = commentRouter;
