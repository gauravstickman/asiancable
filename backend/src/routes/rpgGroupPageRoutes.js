const express = require('express');
const router = express.Router();
const rpgGroupPageController = require('../controllers/rpgGroupPageController');
const protect = require('../middleware/authMiddleware');

router.get('/', rpgGroupPageController.get);
router.put('/', protect, rpgGroupPageController.update);

module.exports = router;
