const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { comparePassword, signUserToken } = require("./auth");

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { role } = req.params;

    // check if user exist
    const user = await userModel.findOne({ email }).select("password");

    if (!user) {
      throw errorHandler("user not found please sign up", 404);
    }

    await comparePassword(password, user.password);

    const access_token = await signUserToken(user.id);

    successHandler(
      res,
      { id: user.id, username: user.username, access_token, role },
      "login successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = { signIn };
