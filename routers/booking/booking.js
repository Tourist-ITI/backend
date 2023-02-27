const express = require("express");
const { protect } = require("../../controllers/auth/auth");
const { getCheckoutSession } = require("../../controllers/booking/booking");

const bookingRouter = express.Router();

bookingRouter.get("/checkout-session/:tourID", protect, getCheckoutSession);

module.exports = bookingRouter;
