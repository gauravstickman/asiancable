const express = require('express');
const router = express.Router();
const investorPageController = require('../controllers/investorPageController');

router.get('/', investorPageController.get);
router.put('/', investorPageController.update);

module.exports = router;
