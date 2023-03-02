const { cartModel:Cart , tourModel:Tour} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
exports.postCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId) {
        throw errorHandler("unauthorized", 401);
    }
    
    const cart = await Cart.findOne(userId);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  }