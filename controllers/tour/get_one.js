const { tourModel: Tour, commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getOneTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id)
      .populate("organizer")
      .populate("rate");

    if (!tour) {
      throw errorHandler("tour not found", 404);
    }

    successHandler(res, tour);
  } catch (err) {
    next(err);
  }
};
