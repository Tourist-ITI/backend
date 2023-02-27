const { commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    successHandler(res, comments);
  } catch (err) {
    next(err);
  }
};
