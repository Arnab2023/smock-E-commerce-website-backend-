const mongoose = require("mongoose");
const TransactionsModel = mongoose.Schema(
    {
        orderId: {
            type: String,
            required: [true, "orderId is required"]
        },
        customerId: {
            type: String,
            required: [true, "customerId is required"]
        },
        paymentStatus: {
            type: String,
            required: [true, "paymentStatus is required"]
        },
        amountPaid: {
            type: String,
            required: [true, "amountPaid is required"]
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

module.exports = mongoose.model("Transactions", TransactionsModel);