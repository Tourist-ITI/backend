const { tourModel, userModel } = require("../../models");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { imageMapping, stringToArray } = require("../../utils/utils");
const { isAdmin } = require("../auth/auth");

exports.updateTour = async (req, res, next) => {
  try {
    const { expected_photos, photos } = req.files;
    const { id } = req.params;

    const getTour = await tourModel.findById(id);
    const user = await userModel.findById(getTour.organizer);

    if (!user || req.userID !== user.id)
      throw errorHandler("unauthorized", 401);

    await isAdmin(req.userID);

    // if images not change

    const handleData = {
      ...req.body,
      expected_photos: imageMapping(expected_photos),
      photos: imageMapping(photos),
      reasons: stringToArray(req.body.reasons),
      coordinates: stringToArray(req.body.coordinates),
      plan: {
        meeting_point: req.body.meeting_point,
        city_highlights: req.body.city_highlights,
        hidden_gems: req.body.hidden_gems,
        magical_storytelling: req.body.magical_storytelling,
        special_treat: req.body.special_treat,
      },
    };

    console.log(handleData);
    const tour = new tourModel(handleData);

    await tourModel.create(handleData);

    successHandler(res, tour, "tour updated successfully");
  } catch (err) {
    next(err);
  }
};
