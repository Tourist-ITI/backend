const {
  tourModel: Tour,
  commentModel: Comment,
  commentModel,
} = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getOneTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("organizer");

    if (!tour) {
      throw errorHandler("tour not found", 404);
    }
    const comments = await commentModel.find({ tour: req.params.id });
    let rate;
    if (comments) {
      sumRates = comments.reduce((acc, item) => acc + item.rating, 0);
      rate = Math.round(sumRates / comments.length);
    }

    successHandler(res, { tour, rate });
  } catch (err) {
    next(err);
  }
};
