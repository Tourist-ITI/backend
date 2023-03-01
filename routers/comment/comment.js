const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { createComment } = require("../../controllers/comments/create_comment");
const {
  deleteOneComment,
} = require("../../controllers/comments/delete_comment");
const { getAllComments } = require("../../controllers/comments/get_all");
const { getOneComment } = require("../../controllers/comments/get_one");
const { updateComment } = require("../../controllers/comments/update_comment");

const { authMW } = require("../../middlewares/authMiddleware");

const commentRouter = express.Router();

commentRouter.post("/:tourId", protect, createComment);
commentRouter.put("/:commentID", protect, updateComment);
commentRouter.get("/:id/:user_id", getOneComment);
commentRouter.delete("/:id/:user_id", protect, deleteOneComment);
commentRouter.get("/:id", getAllComments);

module.exports = commentRouter;
