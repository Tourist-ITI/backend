const { commentModel: Comment, tourModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.createComment = async (req, res, next) => {
  try {
    const { tourId } = req.params;

    const tour = await tourModel.findById(tourId);
    console.log("tour", tourId);
    if (!tour) {
      throw errorHandler("tour not found", 404);
    }
    const handleData = {
      title: req.body.title,
      content: req.body.content,
      rating: +req.body.rating,
      user: req.userID,
      tour: tourId,
    };
    const comment = new Comment(handleData);

    await Comment.create(handleData);

    successHandler(res, comment, "comment created successfully");
  } catch (err) {
    next(err);
  }
};
