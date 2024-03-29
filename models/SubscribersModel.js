const mongoose = require("mongoose");

const SubscriberSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },        
        address: {
            type: String,
            required: [true, "address is required"]
        },
        email: {
            type: String,
            required: [true, "email is required"]
        },
        phone: {
            type: Number,
            required: [true, "phone is required"]
        },
        orders:{
            type: String,
            default: "[]"
        },
        coupon_used: {
            type: String,
            default: "[]"
        }
    },{
        timestamps: true
    }
);

module.exports = mongoose.model("Subscribers", SubscriberSchema);