const express = require("express");
const validateSubscriber = require("../middlewares/validateSubscriber");
const {
  checkout,
  paymentVarification,
  getKey,
} = require("../controllers/CheckoutController");
const router = express.Router();

router.route("/paymentVerification").post(paymentVarification);
router.route("/checkout", validateSubscriber).post(checkout);
router.route("/getKey", validateSubscriber).get(getKey);
module.exports = router;
