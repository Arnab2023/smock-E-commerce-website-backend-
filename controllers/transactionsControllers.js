const asyncHandler = require("express-async-handler");

const OrdersModel = require("../models/OrdersModel");
const CustomerModel = require("../models/SubscribersModel");
const TransactionsModel = require("../models/transactionModel");

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const createTransaction = asyncHandler(async (req, res) => {
  const { orderId, customerId, paymentStatus, amountPaid, mop } = req.body;
  if (!customerId) {
    res.status(401);
    throw new Error("Invalid customerId");
  } else {
    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
      res.status(401);
      throw new Error("Invalid customerId");
    }
  }
  if (!orderId) {
    res.status(401);
    throw new Error("Invalid orderId");
  } else {
    const order = await OrdersModel.findById(orderId);
    if (!order) {
      res.status(401);
      throw new Error("Invalid orderId");
    }
  }
  if (!isNumeric(amountPaid)) {
    res.status(401);
    throw new Error("Invalid amountPaid");
  }
  if (!paymentStatus) {
    res.status(401);
    throw new Error("Invalid paymentStatus");
  }
  if (!mop) {
    res.status(401);
    throw new Error("Invalid mop");
  }
  const transaction = await TransactionsModel.create({
    orderId,
    customerId,
    paymentStatus,
    amountPaid,
    mop,
  });
  res.status(200).json(transaction);
});

const getAllTransactions = asyncHandler(async (req, res) => {
  const transaction = await TransactionsModel.find();
  res.status(200).json(transaction);
});

const getSingleTransaction = asyncHandler(async (req, res) => {
  const transaction = await TransactionsModel.findOne({ _id: req.params.id });
  if (!transaction) {
    res.status(404);
    throw new Error("transaction not found");
  }
  res.status(200).json(transaction);
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await TransactionsModel.findOne({ _id: req.params.id });
  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }
  const deletedTransaction = await TransactionsModel.findByIdAndDelete(
    req.params.id
  );
  res.status(200).json(deletedTransaction);
});

const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await TransactionsModel.findOne({ _id: req.params.id });
  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }
  const updatedTransaction = await TransactionsModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(updatedTransaction);
});

module.exports = {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
};
