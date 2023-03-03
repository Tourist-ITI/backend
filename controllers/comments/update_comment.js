const { commentModel: Comment } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

const { isAdmin } = require("../auth/auth");

exports.updateComment = async (req, res, next) => {
  try {
    //    await isAdmin(req.userID);
    console.log(req.params);
    const comment = await Comment.findOne({ id: req.params.commentID })
      .populate("tour")
      .populate("user");
    if (!comment) {
      throw errorHandler("comment not found", 404);
    }
    if (comment.user.id !== req.userID) {
      throw errorHandler("unauthorized", 401);
    }
    const handleData = {
      title: req.body.title,
      content: req.body.content,
      rating: req.body.rating,
    };
    const editedComment = new Comment(handleData);

    await Comment.findByIdAndUpdate(req.params.commentID , handleData);

    successHandler(res, editedComment, "comment updated successfully");
  } catch (err) {
    next(err);
  }
};
