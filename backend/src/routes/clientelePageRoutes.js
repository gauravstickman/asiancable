const express = require('express');
const router = express.Router();
const { 
    getClientelePageSettings, 
    updateClientelePageSettings 
} = require('../controllers/clientelePageController');

// Routes for Clientele Page Settings
router.get('/', getClientelePageSettings);
router.put('/', updateClientelePageSettings);

module.exports = router;
