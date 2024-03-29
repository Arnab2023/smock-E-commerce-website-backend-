const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const validateAdmin = require("../middlewares/validateAdmin");
const router = express.Router();
const multer = require("multer");
const upload = multer();

// router.use(validateAdmin);
router.use(upload.single("category_image"));
router.route("/").post(createCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

module.exports = router;
