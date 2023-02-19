const { tourModel:Tour } = require("../../models");

exports.deleteOneTour = async (req, res, next) => {
  try {
    const tour = await Tour.delete(req.params.id)
    if (!tour){res.status(404).send('this tour is not found')}
    else{res.status(200).json('tour deleted')}
  } catch (err) {
    next(err);
  }
};
