const dotenv = require("dotenv");
const { tourModel } = require("../../models");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = async (req, res, next) => {
  try {
    const { tourID } = req.params;

    const tour = await tourModel.findById(tourID).populate("organizer");
    console.log(tour);
    if (!tour) {
      throw errorHandler("tour id not found");
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/payment-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "EGP",
            unit_amount: tour.person_cost * tour.person_num * 100,
            product_data: {
              name: `${tour.title} tour`,
              description: `location: ${tour.location}\n,
              Tour Duration: ${tour.duration}\n,
              Organizer: ${tour.organizer.username}
            `,
              images: [tour.photos[0].url, tour.photos[1].url],
            },
          },
          quantity: 1,
        },
      ],
    });

    successHandler(res, session, "start payment session");
  } catch (err) {
    next(err);
  }
};
