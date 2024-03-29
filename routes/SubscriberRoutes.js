const express = require("express");
const { getAllSubscribers, getSingleSubscriber, loginSubscriber, registerSubscriber, updateSubscriber, deleteSubscriber } = require("../controllers/SubscribersControllers");
const router = express.Router();

router.route('/all').get(getAllSubscribers);
router.route('/:id').get(getSingleSubscriber).put(updateSubscriber).delete(deleteSubscriber);
router.route('/login').post(loginSubscriber);
router.route('/register').post(registerSubscriber);


module.exports = router;