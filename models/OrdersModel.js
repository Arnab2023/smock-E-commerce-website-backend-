const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema(
    {
        customerId: {
            type: String,
            required: [true, "customerId is required"]
        },
        products: {
            type: String,
            required: [true, "products is required"]
        },
        orderTotal: {
            type: String,
            required: [true, "orderTotal is required"]
        },
        orderDiscount: {
            type: String,
            required: [true, "orderDiscount is required"]
        },
        orderDiscountedTotal: {
            type: String,
            required: [true, "orderDiscountedTotal is required"]
        },
        amountPaid: {
            type: String,
            required: [true, "amountPaid is required"]
        },
        paymentStatus: {
            type: String,
            required: [true, "paymentStatus is required"]
        },
        delivaryStatus: {
            type: String,
            required: [true, "delivaryStatus is required"]
        },
        mop: {
            type: String,
            required: [true, "mop is required"]
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Orders", OrderSchema);