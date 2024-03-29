const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  getCategoryProducts,
} = require("../controllers/productControllers");
const router = express.Router();

router.route("/all").get(getAllProducts);
router.route("/:id").get(getSingleProduct);
router.route("/category/:id").get(getCategoryProducts);

module.exports = router;
