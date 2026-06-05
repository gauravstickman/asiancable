const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const sustainabilityPageController = require('../controllers/sustainabilityPageController');

router.get('/', sustainabilityPageController.get);
router.put('/', protect, sustainabilityPageController.update);

module.exports = router;
