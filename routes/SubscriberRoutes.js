const express = require("express");
const {
  getAllSubscribers,
  getSingleSubscriber,
  loginSubscriber,
  registerSubscriber,
  updateSubscriber,
  deleteSubscriber,
} = require("../controllers/SubscribersControllers");
const validateSubscriber = require("../middlewares/validateSubscriber");

const router = express.Router();

router.route("/all").get(getAllSubscribers);
router.get("/", validateSubscriber, getSingleSubscriber);
router.put("/", validateSubscriber, updateSubscriber);
router.delete("/", validateSubscriber, deleteSubscriber);
router.route("/login").post(loginSubscriber);
router.route("/register").post(registerSubscriber);

module.exports = router;
