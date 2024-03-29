const mongoose = require("mongoose");

const CouponsSchema = mongoose.Schema(
    {
        Id:{
            type: String,
            required: [true, "Id is required"],
        },
        discount: {
            type: Number,
            required: [true, "discount is required"],
        },
        startTime: {
            type: String,
            default: new Date().toUTCString()
        },
        endTime:{
            type: String,
            default: new Date().toUTCString()
        },
        categoryIds:{
            type: String,
            default: ""
        },
        productIds: {
            type: String,
            default: ""
        }
    },{
        timestamps: true
    }
);

module.exports = mongoose.model("Coupons", CouponsSchema);