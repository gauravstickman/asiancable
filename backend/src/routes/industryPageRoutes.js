const express = require('express');
const router = express.Router();
const industryPageController = require('../controllers/industryPageController');

router.get('/', industryPageController.getAll);
router.get('/:id', industryPageController.getById);
router.put('/:id', industryPageController.updateById);

module.exports = router;
