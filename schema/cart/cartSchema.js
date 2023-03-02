const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartSchema = new Schema({
  active: {
    type: Boolean,
    default:true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tours: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tour",
    },
  ],
  total_money: {
    type: Number,
    default: 0,
  },
  modifiedOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = CartSchema;
