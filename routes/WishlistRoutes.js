const express = require("express");
const {
  CreateWishlistItem,
  removeWishlist,
  getWishlist,
} = require("../controllers/WishlistController");

const router = express.Router();
router.route("/all").get(getWishlist);
router.route("/addwishlist").post(CreateWishlistItem);
router.route("/removewishlist/:id").delete(removeWishlist);

module.exports = router;
