const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionsControllers");
const router = express.Router();

router.route("/").post(createTransaction);
router.route("/all").get(getAllTransactions);
router
  .route("/:id")
  .get(getSingleTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
