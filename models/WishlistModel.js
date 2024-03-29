const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "subcribers",
      required: true,
    },
    productId: {
      type: String,
      ref: "Products",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;
