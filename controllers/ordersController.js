const asyncHandler = require("express-async-handler");

const OrdersModel= require("../models/OrdersModel");
const CustomerModel = require("../models/SubscribersModel");

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const createOrder = asyncHandler(async (req, res) => {
    const { customerId, products, orderTotal, orderDiscount, orderDiscountedTotal, amountPaid, paymentStatus, delivaryStatus, mop } = req.body;
    if(!customerId){
        res.status(401);
        throw new Error("Invalid customerId");
    }
    else {
        const customer = await CustomerModel.findById(customerId);
        if(!customer){
            res.status(401);
            throw new Error("Invalid customerId");
        }
    }
    if(!products){
        res.status(401);
        throw new Error("Invalid products");
    }
    if(!isNumeric(orderTotal)){
        res.status(401);
        throw new Error("Invalid orderTotal");
    }
    if(!isNumeric(orderDiscount)){
        res.status(401);
        throw new Error("Invalid orderDiscount");
    }
    if(!isNumeric(orderDiscountedTotal)){
        res.status(401);
        throw new Error("Invalid orderDiscountedTotal");
    }
    if(!isNumeric(amountPaid)){
        res.status(401);
        throw new Error("Invalid amountPaid");
    }
    if(!paymentStatus){
        res.status(401);
        throw new Error("Invalid paymentStatus");
    }
    if(!delivaryStatus){
        res.status(401);
        throw new Error("Invalid delivaryStatus");
    }
    if(!mop){
        res.status(401);
        throw new Error("Invalid mop");
    }
    const order = await OrdersModel.create({
        customerId,
        products: JSON.stringify(products),
        orderTotal,
        orderDiscount,
        orderDiscountedTotal,
        amountPaid,
        paymentStatus,
        delivaryStatus,
        mop
    });
    res.status(200).json(order);
});

const getAllOrders = asyncHandler(async (req, res) => {
    const Orders = await OrdersModel.find();
    const data = [];
    Orders.map((ord) => {
        data.push({
            ...ord,
            products: JSON.parse(ord.products),
        });
    })
    res.status(200).json(data);
});

const getSingleOrder = asyncHandler(async (req, res) => {
    const order = await OrdersModel.findOne({ _id: req.params.id });
    if(!order) {
        res.status(404);
        throw new Error("Product not found");
    }
    const data = {
        ...order,
        products: JSON.parse(order.products),
    }
    res.status(200).json(data);
});

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await OrdersModel.findOne({ _id: req.params.id });
    if(!order){
        res.status(404);
        throw new Error("Order not found");
    }
    const deletedOrder = await OrdersModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedOrder);
});

const updateOrder = asyncHandler(async (req, res) => {
    const order = await OrdersModel.findOne({ _id: req.params.id });
    if(!order){
        res.status(404);
        throw new Error("Order not found");
    }
    const { products } = req.body;
    if(products){
        req.body = {
            ...req.body,
            products: JSON.stringify(products),
        };
    }
    const updatedOrder = await OrdersModel.findByIdAndUpdate(req.params.id, req.body);
    const data = {
        ...updatedOrder,
        products: JSON.parse(products),
    }
    res.status(200).json(data);
});

module.exports = { createOrder, getAllOrders, getSingleOrder, updateOrder, deleteOrder };