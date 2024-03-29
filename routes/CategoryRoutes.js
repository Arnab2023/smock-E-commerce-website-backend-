const express = require("express");
const {
  getAllCategory,
  getSingleCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/all").get(getAllCategory);
router.route("/:id").get(getSingleCategory);

module.exports = router;
