const Wishlist = require("../models/WishlistModel");
const asyncHandler = require("express-async-handler");

const CreateWishlistItem = asyncHandler(async (req, res) => {
  const WishlistItem = req.body;
  try {
    const existingItem = await Wishlist.findOne({
      productId: WishlistItem.productId,
    });

    if (existingItem) {
      return res.status(201).json({ message: "exist" });
    }

    const newItem = await Wishlist.create(WishlistItem);

    res.status(201).json({ message: "created", data: newItem });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

const removeWishlist = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  try {
    const deleteitem = await Wishlist.findByIdAndDelete(_id);
    if (deleteitem) {
      res.json(deleteitem);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.find().populate("productId");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { CreateWishlistItem, removeWishlist, getWishlist };
