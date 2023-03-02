const dotenv = require("dotenv");
const { tourModel, userModel } = require("../../models");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = async (req, res, next) => {
  try {
    const { cartID } = req.params;
    const { person_num } = req.body;
    const tour = await tourModel.findById(cartID).populate("organizer");
    if (!tour) {
      throw errorHandler("tour id not found", 400);
    }
    if (tour.person_num - tour.reservation_number > person_num) {
      throw errorHandler("tour is complete", 400);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/payment-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/payment-failed`,
      client_reference_id: req.params.cartID,
      customer_email: tour.organizer.email,
      meta_data: req.body,
      line_items: [
        {
          price_data: {
            currency: "EGP",
            unit_amount: tour.person_cost * person_num * 100,
            product_data: {
              name: `${tour.title} tour`,
              description: `location: ${tour.location}\n,
              Tour Duration: ${tour.duration}\n,
              Organizer: ${tour.organizer.username}
            `,
              images: [tour.photos[0].url, tour.photos[0].url],
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
