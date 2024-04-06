const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  pincode: String,
  addressLine: String,
  locality: String,
  city: String,
  state: String,
});

module.exports = mongoose.model("Address", addressSchema);
