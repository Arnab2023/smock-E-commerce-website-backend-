const express = require("express");
const {
  getAllAdmins,
  getSingleAdmin,
  loginAdmin,
  registerAdmin,
  updatePassword,
  deleteAdmin,
} = require("../controllers/adminControllers");
const router = express.Router();

router.route("/all").get(getAllAdmins);
router.route("/:id").get(getSingleAdmin);
router.route("/login").post(loginAdmin);
router.route("/register").post(registerAdmin);
router.route("/update").put(updatePassword);
router.route("/delete/:id").delete(deleteAdmin);

module.exports = router;
