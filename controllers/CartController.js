const Cart = require("../models/CartModel");
const asyncHandler = require("express-async-handler");

const CreateCartItem = asyncHandler(async (req, res) => {
  const cartItem = {...req.body,userId:req.subid}
  try {
    const existingItem = await Cart.findOne({
      productId: cartItem.productId,
    });

    if (existingItem) {
      return res
        .status(400)
        .json({ message: "Item already exists in the cart" });
    }

    const newItem = await Cart.create(cartItem);
    res.status(201).json(newItem);
  } catch (err) {
    console.log(error)
    res.status(400).json({ message: err.message });
  }
});

const removeCart = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  try {
    const deleteitem = await Cart.findByIdAndDelete(_id);

    if (deleteitem) {
      res.json(deleteitem);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getCart = asyncHandler(async (req, res) => {
  const userId =req.subid;
  try {
    const cart = await Cart.find({userId}).populate("productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const updateCart = asyncHandler(async (req, res) => {
  try {
    const count = req.body.qty;
    const _id = req.body.id;
    const size = req.body.size;
    // console.log(count, size, _id);
    const updatedCart = await Cart.findByIdAndUpdate(
      _id,
      { count, size },
      { new: true }
    ).populate("productId");
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { CreateCartItem, removeCart, getCart, updateCart };
