const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  addressLine: { type: String, default: "" },
  locality: { type: String, default: "" },
  state: String,
  city: String,
  pincode: String
});


module.exports = mongoose.model("Address", addressSchema);
