const express = require('express');
const { 
    createBlog, 
    getBlogs, 
    getBlogById, 
    getBlogBySlug,
    updateBlog, 
    deleteBlog 
} = require('../controllers/blogController');
const protect = require('../middleware/authMiddleware');

const { uploadS3 } = require('../middleware/uploadS3');

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, uploadS3.single('image'), createBlog);

router.route('/slug/:slug')
    .get(getBlogBySlug);

router.route('/:id')
    .get(getBlogById)
    .put(protect, uploadS3.single('image'), updateBlog)
    .delete(protect, deleteBlog);

module.exports = router;
