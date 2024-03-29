const express = require("express");
const {
  getCoupons,
  getSingleCoupons,
} = require("../controllers/CouponsControllers");
const router = express.Router();

router.route("/").get(getCoupons);
router.route("/:id").get(getSingleCoupons);

module.exports = router;
