const express = require("express");
const {
  CreateWishlistItem,
  removeWishlist,
  getWishlist,
} = require("../controllers/WishlistController");
const validateSubscriber = require("../middlewares/validateSubscriber");

const router = express.Router();
router.use(validateSubscriber);
router.route("/all").get(getWishlist);
router.route("/addwishlist").post(CreateWishlistItem);
router.route("/removewishlist/:id").delete(removeWishlist);

module.exports = router;
