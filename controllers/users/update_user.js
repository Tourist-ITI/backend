const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { imageMapping } = require("../../utils/utils");

exports.updateUser = async (req, res, next) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    if (req.userID !== getUser.id) throw errorHandler("unauthorized", 401);

    const handleData = {
      username: req.body.username,
      // photo: req.body.photo,
      // cover_photo: req.body.cover_photo,
      phone: req.body.phone,
      bio: req.body.bio,
      city: req.body.city,
    };
    const user = new userModel(handleData);
    await userModel.create(handleData);
    successHandler(res, user, "user updated successfully");
  } catch (err) {
    next(err);
  }
};
