const express = require("express");
const { createEvents, deleteEvents } = require("../controllers/EventsControllers");
const validateAdmin = require("../middlewares/validateAdmin");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(validateAdmin);
router.use(upload.single("event_image"));
router.route('/').post(createEvents);
router.route('/:id').delete(deleteEvents);

module.exports = router;