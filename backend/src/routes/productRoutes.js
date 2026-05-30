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
    .post(protect, uploadS3.fields([{ name: 'image', maxCount: 1 }, { name: 'overviewImage', maxCount: 1 }]), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, uploadS3.fields([{ name: 'image', maxCount: 1 }, { name: 'overviewImage', maxCount: 1 }]), updateProduct)
    .delete(protect, deleteProduct);

module.exports = router;
