const { commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getTourComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ tour: req.params.tourID }).populate(
      "user"
    );

    if (!comments) {
      throw errorHandler("Comments not found", 404);
    }

    successHandler(res, comments);
  } catch (err) {
    next(err);
  }
};
