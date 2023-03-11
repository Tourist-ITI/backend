const express = require("express");
const { protect } = require("../../controllers/auth/auth");
const { deleteFromCart } = require("../../controllers/cart/deleteFromCart");

const { addToCart } = require("../../controllers/cart/postCart");

const cartRouter = express.Router();

cartRouter.post("/:tourID", protect, addToCart);
cartRouter.delete("/:tourID", protect, deleteFromCart);

module.exports = cartRouter;
