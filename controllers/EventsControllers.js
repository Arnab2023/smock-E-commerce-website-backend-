const asyncHandler = require("express-async-handler");
const CouponsModel = require("../models/CouponsModel");
const EventsModel = require("../models/EventsModel");

const createEvents = asyncHandler( async (req, res) => {
    const { name, description, startTime, endTime, offer, link, couponId } = req.body;    
    let image = "";
    if(!req.file){
        res.status(401);
        throw new Error("image is important");
    }
    image = 'data:image/png;base64,' +  req.file.buffer.toString("base64");
    if(!name){
        res.status(401);
        throw new Error("name is required");
    }
    if(!description) {
        res.status(401);
        throw new Error("description is required");
    }
    if(!endTime){
        res.status(401);
        throw new Error("endTime is required");
    }
    if(new Date(startTime) === "Invalid Date"){
        res.status(401);
        throw new Error("Invalid Start Time")
    }
    if(new Date(endTime) === "Invalid Date") {
        res.status(401);
        throw new Error("Invalid End Time")
    }
    if(couponId) {
        const coupon = await CouponsModel.findById(couponId);
        if(!coupon){
            res.status(401);
            throw new Error("Coupon ID Invalid!!");
        }
    }
    if(!link) {
        res.status(401);
        throw new Error("link is required!!");
    }
    if(!offer) {
        res.status(401);
        throw new Error("offer is required!!");
    }
    const data = {
        image,
        name,
        description,
        endTime,
        offer,
        link
    };
    if(startTime){
        data = {
            ...data,
            startTime
        }
    }
    if(couponId){
        data = {
            ...data,
            couponId
        }
    }
    const event = await EventsModel.create(data);
    return res.status(200).json(event);
});

const getEvents = asyncHandler(async (req, res) => {
    const event = await EventsModel.find().sort({ startTime: -1 });
    return res.status(200).json(event);
});

const getSingleEvents = asyncHandler(async (req, res) => {
    const event = await EventsModel.findById(req.params.id);
    if(!event) {
        res.status(401);
        throw new Error("Invalid Event Id")
    }
    return res.status(200).json(event);
});

const deleteEvents = asyncHandler(async (req, res) => {
    const event = await EventsModel.findById(req.params.id);
    if(!event) {
        res.status(401);
        throw new Error("Invalid Coupon Id")
    }
    const deletedEvent = await EventsModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Coupon Deleted!!"});
});

module.exports = { getEvents, getSingleEvents, deleteEvents, createEvents };