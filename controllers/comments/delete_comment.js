const { commentModel: Comment, tourModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.deleteOneComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      tour: req.params.id,
      user: req.params.user_id,
    })
      .populate("tour")
      .populate("user");

    if (!comment) {
      throw errorHandler("comment not found", 404);
    }

    if (comment.user.id !== req.userID && tour.organizer !== req.userID) {
      throw errorHandler("unauthorized", 401);
    }
    await Comment.findByIdAndRemove(req.params.id);

    successHandler(res, comment, "comment deleted successfully");
  } catch (err) {
    next(err);
  }
};
