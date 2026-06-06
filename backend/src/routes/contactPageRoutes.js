const express = require('express');
const router = express.Router();
const { getContactPageSettings, updateContactPageSettings } = require('../controllers/contactPageController');

// Routes for /api/contact-page
router.get('/', getContactPageSettings);
router.put('/', updateContactPageSettings);

module.exports = router;
