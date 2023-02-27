const { commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getOneComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    console.log(comment);
    console.log(req.params.id);
    if (!comment) {
      throw errorHandler("comment not found", 404);
    }
    successHandler(res, comment);
  } catch (err) {
    next(err);
  }
};
