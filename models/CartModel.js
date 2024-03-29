const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "subcribers",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
