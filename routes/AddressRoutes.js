const express = require('express');
const {createAddress, deleteAddress,defaultAddress,updateAddress,getAddress} = require("../controllers/AddressController");
const router = express.Router();

router.route("/all").get(getAddress)
router.route("/delete").delete(deleteAddress)
router.route("/add-address").post(createAddress)
router.route("/update-address").put(updateAddress)
router.route("/default-address").put(defaultAddress)

module.exports = router;     