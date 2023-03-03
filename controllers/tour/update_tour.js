const { cloudUploadImages } = require("../../middlewares/cloudinary/cloudinary");
const { tourModel, userModel } = require("../../models");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { imageMapping, stringToArray } = require("../../utils/utils");
const { isAdmin } = require("../auth/auth");

exports.updateTour = async (req, res, next) => {
  try {
    const { expected_photos, photos } = req.files;
    const { id } = req.params;

    const getTour = await tourModel.findOne({id}).populate("organizer");
    if (!getTour) {
      throw errorHandler("invalid tour id", 404);
    }
    const user = await userModel.findOne({_id: req.userID});

    console.log(getTour,user);
    await isAdmin(req.userID);
    if(getTour.organizer.id !== req.userID){
      throw errorHandler("unauthorized",401);
    }
    const handleData = {
      ...req.body,
      photos: await cloudUploadImages(photos),
      expected_photos: await cloudUploadImages(expected_photos),
      reasons: req.body.reasons,
      plan: {
        meeting_point: req.body.meeting_point,
        city_highlights: req.body.city_highlights,
        hidden_gems: req.body.hidden_gems,
        magical_storytelling: req.body.magical_storytelling,
        special_treat: req.body.special_treat,
      },
    };

    const tour = new tourModel(handleData);

    await tourModel.findByIdAndUpdate(req.params, handleData);

    successHandler(res, tour, "tour updated successfully");
  } catch (err) {
    next(err);
  }
};
