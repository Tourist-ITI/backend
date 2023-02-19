const { tourModel:Tour } = require("../../models");

exports.getOneTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id)
    if (!tour){res.status(404).send('this tour is not found')}
    else{res.status(200).json(tour)}
  } catch (err) {
    next(err);
  }
};
