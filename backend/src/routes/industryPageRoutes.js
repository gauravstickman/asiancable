const express = require('express');
const router = express.Router();
const industryPageController = require('../controllers/industryPageController');

router.get('/', industryPageController.getSettings);
router.put('/', industryPageController.updateSettings);

module.exports = router;
