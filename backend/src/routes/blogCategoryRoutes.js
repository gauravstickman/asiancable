const express = require('express');
const { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/blogCategoryController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(protect, createCategory);

router.route('/:id')
    .get(getCategoryById)
    .put(protect, updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;
