const { tourModel: Tour } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getOneTour = async (req, res, next) => {
  try {
    console.log("pew");
    const tour = await Tour.findById(req.params.id).populate("organizer");
    if (!tour) {
      throw errorHandler("tour not found", 404);
    }
    const comments = await Comment.aggregate([
      { $match: { _id: { $in: tour.comments } } },
      {
        $group: {
          _id: tour.comments,
          average: { $avg: "$rating" },
        },
      },
    ]);
    comments.forEach(async (comment) => {
      const comments = await Comment.find({ _id: comment._id });

      res.render("stats", {
        ...tour,
        comments,
        avg: comment.average,
      });
    });
    successHandler(res, tour);
  } catch (err) {
    next(err);
  }
};
