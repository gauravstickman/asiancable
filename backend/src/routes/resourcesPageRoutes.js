const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/resourcesPageController');
const protect = require('../middleware/authMiddleware');

router.route('/')
    .get(getSettings)
    .put(protect, updateSettings);

module.exports = router;
