const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { addToCart } = require("../../controllers/cart/postCart");

const cartRouter = express.Router();

cartRouter.post("/:tourID", protect, addToCart);

module.exports = cartRouter;
