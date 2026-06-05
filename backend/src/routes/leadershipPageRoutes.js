const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const leadershipPageController = require('../controllers/leadershipPageController');

router.get('/', leadershipPageController.get);
router.put('/', protect, leadershipPageController.update);

module.exports = router;
