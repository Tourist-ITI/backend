const { userModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
exports.getOneUser = async (req, res, next) => {
  try {
    const user = await userModel
      .findOne({ id: req.params.id })
      .populate("cart");

    if (!user) {
      throw errorHandler("user not found", 404);
    } else {
      successHandler(res, user);
    }
  } catch (err) {
    next(err);
  }
};
