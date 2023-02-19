const { tourModel:Tour } = require("../../models");

exports.getAllTours = async (req, res, next) => {
  
  try {
    const tours = await Tour.find()
    res.status(200).json(tours);
  } catch (err) {
    next(err);
  }
};

