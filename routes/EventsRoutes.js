const express = require("express");
const {
  getEvents,
  getSingleEvents,
} = require("../controllers/EventsControllers");
const router = express.Router();

router.route("/").get(getEvents);
router.route("/:id").get(getSingleEvents);

module.exports = router;
