const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const validateAdmin = require("../middlewares/validateAdmin");
const router = express.Router();
const multer = require("multer");
const upload = multer();

// router.use(validateAdmin);
// router.use();
router.route("/").post(upload.array("images"), createProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
