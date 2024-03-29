const mongoose = require("mongoose");

const EventsSchema = mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, "Image is Required"]
        },
        name:{
            type: String,
            required: [true, "name is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        startTime: {
            type: String,
            default: new Date().toUTCString()
        },
        endTime:{
            type: String,
            default: new Date().toUTCString()
        },
        offer:{
            type: String,
            required: [true, "offer is required"]
        },
        couponId: {
            type: String,
            default: "0"
        },
        link:{
            type: String,
            required: [true, "link is required"],
        }
    },{
        timestamps: true
    }
);

module.exports = mongoose.model("Events", EventsSchema);