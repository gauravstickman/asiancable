const express = require('express');
const router = express.Router();
const homepageSettingsController = require('../controllers/homepageSettingsController');

router.get('/', homepageSettingsController.getSettings);
router.put('/', homepageSettingsController.updateSettings);

module.exports = router;
