const { commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getOneComment = async (req, res, next) => {
  try {
    const comment = await Comment.find({
      post_id: req.params.id,
      user_id: req.params.user_id,
    })
      .populate("tour")
      .populate("user");
    if (!comment) {
      throw errorHandler("comment not found", 404);
    }
    successHandler(res, comment);
  } catch (err) {
    next(err);
  }
};
