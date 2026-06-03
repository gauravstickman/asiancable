const express = require('express');
const router = express.Router();
const aboutPageController = require('../controllers/aboutPageController');

// Get about page settings
router.get('/', aboutPageController.get);

// Update about page settings
router.put('/', aboutPageController.update);

module.exports = router;
