const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    description: {
      type: String,
      default: "",
    },
    categoryId: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
      required: [true, "brand is required"],
    },
    soldby: {
      type: String,
      default: "",
    },
    size: {
      type: [String],
      default: [],
    },
    colour: {
      type: String,
      default: "",
    },
    For: {
      type: String,
      required: [true, "purchasePrice is required"],
    },
    purchasePrice: {
      type: Number,
      required: [true, "purchasePrice is required"],
    },
    retailPrice: {
      type: Number,
      required: [true, "retailPrice is required"],
    },
    image: {
      type: [String],
      required: [true, "Image is required"],
    },
    stock_qty: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productsSchema);
