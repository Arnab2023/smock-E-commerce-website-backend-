const express = require("express");
const { createOrder, getAllOrders, getSingleOrder, updateOrder, deleteOrder } = require("../controllers/ordersController");
const router = express.Router();


router.route('/').post(createOrder)
router.route('/all').get(getAllOrders);
router.route('/:id').get(getSingleOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;