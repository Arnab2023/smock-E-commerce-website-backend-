const mongoose = require("mongoose");

const SubscriberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      //   required: [true, "Name is required"],
      default: "",
    },
    password: {
      type: String,
      //   required: [true, "password is required"],
      default: "1234",
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        default: [],
      },
    ],
    defaultAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default:null,
    },

    email: {
      type: String,
      //   required: [true, "email is required"],
      default: "",
    },
    phone: {
      type: Number,
      required: [true, "phone is required"],
    },
    orders: {
      type: String,
      default: "[]",
    },
    coupon_used: {
      type: String,
      default: "[]",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subscribers", SubscriberSchema);
