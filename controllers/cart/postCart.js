// const { cartModel:Cart } = require("../../models/index");
// const { errorHandler, successHandler } = require("../../utils/responseHandler");
// exports.postCart = asyncHandler(async (req, res, next) => {
//   // try {
//   //   let cart = await Cart.findOne(userId);

//   //   if (cart) {
//   //     let itemIndex = cart.products.findIndex(p => p.productId == productId);

//   //     if (itemIndex > -1) {
//   //       let productItem = cart.products[itemIndex];
//   //       productItem.quantity = quantity;
//   //       cart.products[itemIndex] = productItem;
//   //     } else {
//   //       //product does not exists in cart, add new item
//   //       cart.products.push({ productId, quantity, name, price });
//   //     }
//   //     cart = await cart.save();
//   //     return res.status(201).send(cart);
//   //   } else {
//   //     //no cart for user, create new cart
//   //     const newCart = await Cart.create({
//   //       userId,
//   //       products: [{ productId, quantity, name, price }]
//   //     });

//   //     return res.status(201).send(newCart);
//   //   }
//   // } catch (err) {
//   //   console.log(err);
//   //   res.status(500).send("Something went wrong");
//   // }
//   })