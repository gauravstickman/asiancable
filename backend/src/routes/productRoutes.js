const express = require('express');
const { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

const { uploadS3 } = require('../middleware/uploadS3');

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, uploadS3.single('image'), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, uploadS3.single('image'), updateProduct)
    .delete(protect, deleteProduct);

module.exports = router;
