const { commentModel: Comment } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

const { isAdmin } = require("../auth/auth");

exports.updateComment = async (req, res, next) => {
  try {
    //    await isAdmin(req.userID);
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      throw errorHandler("comment not found", 404);
    }
    const post = await Post.findById(comment.post_id);
    if (
      comment.user_id !== res.locals.userID ||
      post.organizer !== res.locals.userID
    ) {
      throw errorHandler("unauthorized", 401);
    }
    const handleData = {
      ...req.body,
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    };
    const editedComment = new Comment(handleData);

    await Comment.create(handleData);

    successHandler(res, editedComment, "comment updated successfully");
  } catch (err) {
    next(err);
  }
};
