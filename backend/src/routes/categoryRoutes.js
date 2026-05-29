const express = require('express');
const { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/categoryController');
const protect = require('../middleware/authMiddleware');

const { uploadS3 } = require('../middleware/uploadS3');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(protect, uploadS3.single('image'), createCategory);

router.route('/:id')
    .get(getCategoryById)
    .put(protect, uploadS3.single('image'), updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;
