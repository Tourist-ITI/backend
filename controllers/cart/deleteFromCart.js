const { CartModel, tourModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.deleteFromCart = async (req, res, next) => {
    try {
      const { tourID } = req.params.tourID;
      const { userID } = req.params.userID;
      const cart = await CartModel.findOne(userID);
      console.log(req.params.tourID);
      console.log("before filter",cart);
      const result = cart.tours.filter(tID=>tID!==tourID)

      console.log("after filter",result);
    //   await CartModel.create(Cart);

      successHandler(res, cart, "cart created successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };