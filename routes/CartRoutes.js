const express = require("express");
const {
  CreateCartItem,
  removeCart,
  getCart,
  updateCart,
} = require("../controllers/CartController");

const router = express.Router();
router.route("/all").get(getCart);
router.route("/addcart").post(CreateCartItem);
router.route("/removecart/:id").delete(removeCart);
router.route("/updatecart").put(updateCart);

module.exports = router;
