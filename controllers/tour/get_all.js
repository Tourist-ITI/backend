const { tourModel: Tour } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getAllTours = async (req, res, next) => {
  try {
    const { location, all } = req.query;

    let tours;
    if (!location) {
      tours = await Tour.find().populate("organizer");
    } else tours = await Tour.find({ location }).populate("organizer");

    if (!tours) {
      throw errorHandler();
    }

    if (all) {
      const listOfCities = tours.map((tour) => tour.location);
      const set = new Set(listOfCities);
      tours = [...set];
    }

    successHandler(res, tours);
  } catch (err) {
    next(err);
  }
};
