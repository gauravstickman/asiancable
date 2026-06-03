const express = require('express');
const router = express.Router();
const manufacturingPageController = require('../controllers/manufacturingPageController');

router.get('/', manufacturingPageController.get);
router.put('/', manufacturingPageController.update);

module.exports = router;
