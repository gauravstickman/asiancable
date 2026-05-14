const express = require('express');
const multer = require('multer');
const path = require('path');
const { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/categoryController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.route('/')
    .get(getCategories)
    .post(protect, upload.single('image'), createCategory);

router.route('/:id')
    .get(getCategoryById)
    .put(protect, upload.single('image'), updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;
