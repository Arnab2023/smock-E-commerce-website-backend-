const asyncHandler = require("express-async-handler");
const CouponsModel = require("../models/CouponsModel");
const CategoryModel = require("../models/CategoryModel");
const ProductsModel = require("../models/ProductsModel");

const createCoupons = asyncHandler( async (req, res) => {
    const { Id, discount, startTime, endTime, categoryId, productId } = req.body;
    if(!Id){
        res.status(401);
        throw new Error("Id is required");
    }
    if(Id) {
        const couponwithId = await CouponsModel.findOne({ Id });
        if(couponwithId) {
            res.status(401);
            throw new Error("Coupon with same Id Already Exists");
        }
    }
    if(!discount) {
        res.status(401);
        throw new Error("discount is required");
    }
    try {
        parseInt(discount);
    }
    catch(err) {
        res.status(401);
        throw new Error("discount value is invalid");
    }
    if(!endTime){
        res.status(401);
        throw new Error("endTime is required");
    }
    if(startTime) {
        if(new Date(startTime) === "Invalid Date"){
            res.status(401);
            throw new Error("Invalid Start Time")
        }
    }
    if(new Date(endTime) === "Invalid Date") {
        res.status(401);
        throw new Error("Invalid End Time")
    }
    if(!categoryId && !productId){
        res.status(401);
        throw new Error("Coupon Should be attached with either a categoy or a product");
    }
    if(categoryId) {
        const category = await CategoryModel.findById(categoryId);
        if(!category) {
            res.status(401);
            throw new Error("Invalid Category ID");
        }
    }
    if(productId) {
        const produuct = await ProductsModel.findById(productId);
        if(!produuct) {
            res.status(401);
            throw new Error("Invalid Product ID");
        }
    }
    const data = {
        Id,
        discount,
        endTime,
        startTime: startTime ? startTime : new Date().toUTCString(),
        categoryId: categoryId ? categoryId : "-",
        productId: productId ? productId : "-"
    };
    const coupon = await CouponsModel.create(data);
    return res.status(200).json(coupon);
});

const getCoupons = asyncHandler(async (req, res) => {
    const coupons = await CouponsModel.find().sort({ startTime: -1 });
    return res.status(200).json(coupons);
});

const getSingleCoupons = asyncHandler(async (req, res) => {
    const coupons = await CouponsModel.findById(req.params.id);
    if(!coupons) {
        res.status(401);
        throw new Error("Invalid Coupon Id")
    }
    return res.status(200).json(coupons);
});

const deleteCoupons = asyncHandler(async (req, res) => {
    const coupons = await CouponsModel.findById(req.params.id);
    if(!coupons) {
        res.status(401);
        throw new Error("Invalid Coupon Id")
    }
    const deletedCoupon = await CouponsModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Coupon Deleted!!"});
});

module.exports = { getCoupons, getSingleCoupons, deleteCoupons, createCoupons };