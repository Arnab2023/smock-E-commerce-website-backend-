const Address = require("../models/AddressModel");
const User = require("../models/SubscribersModel");
const asyncHandler = require("express-async-handler");

//================================================Adding Address=====================//
const createAddress = asyncHandler(async (req, res) => {
  const body = req.body;
  const subId = req.query.subId;

  if (!body.state) {
    res.status(400).json({ message: "state is required" });
  }

  if (!body.city) {
    res.status(400).json({ message: "city is required" });
  }

  if (!body.pincode) {
    res.status(400).json({ message: "pincode is required" });
  }

  try {
    let newItem;
    const user = await User.findById(subId);
    if (User) {
      newItem = await Address.create(body);
      user.address.push(newItem._id);
      await user.save();
    }
    res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

//----------------------------------------------------------------Update Address--------------------------------------------------------------------------//

const updateAddress = asyncHandler(async (req, res) => {
  const addressId = req.query.addressId;
  const body = req.body;

  try {
    const address = await Address.findById(addressId);

    // Check if the address with the given ID exists
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update the address properties
    address.name =
      body.name !== undefined && body.name !== "" ? body.name : address.name;
    address.phoneNumber =
      body.phoneNumber !== undefined && body.phoneNumber !== ""
        ? body.phoneNumber
        : address.phoneNumber;
    address.pincode =
      body.pincode !== undefined && body.pincode !== ""
        ? body.pincode
        : address.pincode;
    address.addressLine =
      body.addressLine !== undefined && body.addressLine !== ""
        ? body.addressLine
        : address.addressLine;
    address.locality =
      body.locality !== undefined && body.locality !== ""
        ? body.locality
        : address.locality;
    address.city =
      body.city !== undefined && body.city !== "" ? body.city : address.city;
    address.state =
      body.state !== undefined && body.state !== ""
        ? body.state
        : address.state;

    // Save the updated address
    await address.save();

    res.status(200).json({ message: "Address updated successfully", address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//===================================Default Address==============================//

const defaultAddress = asyncHandler(async (req, res) => {
  const { subId, addressId } = req.query;

  try {
    const user = await User.findByIdAndUpdate(subId, {
      defaultAddress: addressId,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "Default address updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//-------------------------------------delete Address--------------------------------//

const deleteAddress = asyncHandler(async (req, res) => {
  const addressId = req.query.addressId;
  const subId = req.query.subId;

  const user = await User.findById(subId);

  user.address = user.address.filter(
    (address) => address._id.toString() !== addressId
  );
  if (user) {
    try {
      // Find the address by ID and delete it
      const deletedAddress = await Address.findByIdAndDelete(addressId);

      // Check if the address exists
      if (!deletedAddress) {
        return res.status(404).json({ message: "Address not found" });
      }
      user.save();
      res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

//===================================get Address===========================================//
const getAddress = asyncHandler(async (req, res) => {
  const subId = req.query.subId;

  try {
    const user = await User.findById(subId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allAddresses = await Promise.all(
      user.address.map(async (addressId) => {
        const address = await Address.findById(addressId);
        return address;
      })
    );

    res.status(200).json(allAddresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createAddress,
  deleteAddress,
  defaultAddress,
  updateAddress,
  getAddress,
};
