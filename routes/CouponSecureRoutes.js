const express = require("express");
const { createCoupons, deleteCoupons } = require("../controllers/CouponsControllers");
const validateAdmin = require("../middlewares/validateAdmin");
const router = express.Router();

router.use(validateAdmin);
router.route('/').post(createCoupons);
router.route('/:id').delete(deleteCoupons);

module.exports = router;