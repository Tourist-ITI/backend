const { CartModel, tourModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.postCart = async (req, res, next) => {
  try {
    const { tourID } = req.params;
    const { subscriber_number } = req.body;
    const tour = await tourModel.findById(tourID);
    console.log(subscriber_number, tour);

    if (!tour) {
      throw errorHandler("tour is not found", 400);
    }
    const total_money = +subscriber_number * +tour.person_cost;

    const Cart = new CartModel({
      user: req.userID,
      tours: tourID,
      total_money,
    });

    await CartModel.create(Cart);
    successHandler(res, tour, "cart created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
