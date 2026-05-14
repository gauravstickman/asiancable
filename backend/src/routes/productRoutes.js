const express = require('express');
const multer = require('multer');
const path = require('path');
const { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
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
    .get(getProducts)
    .post(protect, upload.single('image'), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, upload.single('image'), updateProduct)
    .delete(protect, deleteProduct);

module.exports = router;
