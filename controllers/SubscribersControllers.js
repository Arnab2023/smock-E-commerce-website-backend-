const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const SubscribersModel = require("../models/SubscribersModel");
const CouponsModel = require("../models/CouponsModel");

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const registerSubscriber = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (!isNumeric(phone)) {
    res.status(401);
    throw new Error("Invalid phone");
  }
  const existsWithPhone = await SubscribersModel.findOne({ phone });
  if (existsWithPhone) {
    res.status(201).json(existsWithPhone);
  }
  // const hashedPass = await bcrypt.hash(password, 10);
  const subscriber = await SubscribersModel.create({
    // name,
    // password: hashedPass,
    // email,
    phone,
  });
  res.status(201).json(subscriber);
});

const loginSubscriber = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(403);
    throw new Error("Invalid name or password");
  }
  let subscriber = await SubscribersModel.findOne({ name });
  if (!subscriber) {
    res.status(404);
    throw new Error("Invalid name");
  } else {
    const comparePass = await bcrypt.compare(password, subscriber.password);
    if (comparePass) {
      const accessToken = jwt.sign(
        {
          subscriber: {
            id: subscriber._id,
            name: subscriber.name,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      res.status(200).json(accessToken);
    } else {
      res.status(404);
      throw new Error("Invalid password");
    }
  }
});

const updateSubscriber = asyncHandler(async (req, res) => {
  const existsWithName = await SubscribersModel.findById(req.params.id);
  if (!existsWithName) {
    res.status(403);
    throw new Error("Subscriber not Found");
  }
  const { password, coupon_used } = req.body;
  if (password) {
    const hashedPass = await bcrypt.hash(password, 10);
    req.body = {
      ...req.body,
      password: hashedPass,
    };
  }
  if (coupon_used) {
    const coupon = await CouponsModel.findById(coupon_used);
    if (!coupon) {
      res.status(401);
      throw new Error("Invalid Coupon ID");
    }
    const alreadyUsed = JSON.parse(existsWithName.coupon_used);
    if (alreadyUsed.includes(coupon_used)) {
      res.status(403);
      throw new Error("Can't use this coupon again");
    }
    req.body = {
      ...req.body,
      coupon_used: JSON.stringify([...alreadyUsed, coupon_used]),
    };
  }
  const subscriber = await SubscribersModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(201).json(subscriber);
});

const deleteSubscriber = asyncHandler(async (req, res) => {
  const { password } = req.body;
  if (!password) {
    res.status(401);
    throw new Error("Invalid password");
  }
  const existsWithName = await SubscribersModel.findById(req.params.id);
  if (!existsWithName) {
    res.status(404);
    throw new Error("Subscriber not Found");
  }
  const comparePass = await bcrypt.compare(password, existsWithName.password);
  if (comparePass) {
    const subscriber = await SubscribersModel.findByIdAndDelete(req.params.id);
  } else {
    res.status(401);
    throw new Error("Password does not match");
  }
  res.status(204).json({ message: "Subscriber Deleted!!" });
});

const getAllSubscribers = asyncHandler(async (req, res) => {
  const subscriber = await SubscribersModel.find();
  res.status(200).json(subscriber);
});

const getSingleSubscriber = asyncHandler(async (req, res) => {
  const subscriber = await SubscribersModel.findById(req.params.id);
  res.status(200).json(subscriber);
});

module.exports = {
  getAllSubscribers,
  getSingleSubscriber,
  loginSubscriber,
  registerSubscriber,
  updateSubscriber,
  deleteSubscriber,
};
