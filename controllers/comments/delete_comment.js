const { commentModel: Comment, tourModel } = require("../../models");
const { tourModel: Post } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.deleteOneComment = async (req, res, next) => {
  try {
    const comment = await Comment.find({
      post_id: req.params.id,
      user_id: req.params.user_id,
    });
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
    await Comment.deleteOne({ id: req.params.id });
    successHandler(res, comment, "comment deleted successfully");
  } catch (err) {
    next(err);
  }
};
