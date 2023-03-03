const { userModel: User } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("cart");
    console.log(user);
    if (!user) {
      throw errorHandler("user not found", 404);
    } else {
      successHandler(res, user);
    }
  } catch (err) {
    next(err);
  }
};
