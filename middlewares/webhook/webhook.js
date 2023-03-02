const dotenv = require("dotenv");

dotenv.config();

exports.webhookCheckout = async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      console.log("handle order here");
    }
  } catch (err) {
    next(err);
  }
};
