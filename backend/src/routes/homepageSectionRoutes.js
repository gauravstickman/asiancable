const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove, getSingleton, updateSingleton } = require('../controllers/homepageSectionController');

// Singleton routes (About Us, Facts, Applications, etc.)
router.get('/single/:section', getSingleton);
router.put('/single/:section', updateSingleton);

// Collection routes
router.get('/:section', getAll);
router.get('/:section/:id', getOne);
router.post('/:section', create);
router.put('/:section/:id', update);
router.delete('/:section/:id', remove);

module.exports = router;
