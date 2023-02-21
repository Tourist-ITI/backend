const { tourModel:Tour } = require("../../models");
const { successHandler,errorHandler } = require("../../utils/responseHandler");

exports.getAllTours = async (req, res, next) => {
  
  try {
    const tours = await Tour.find().populate('organizer')
    successHandler(res,tours)
  } catch (err) {
    next(err);
  }
};

