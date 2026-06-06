const express = require('express');
const router = express.Router();
const {
    getCaseStudies,
    getCaseStudyById,
    createCaseStudy,
    updateCaseStudy,
    deleteCaseStudy
} = require('../controllers/caseStudyController');
const protect = require('../middleware/authMiddleware');

router.route('/')
    .get(getCaseStudies)
    .post(protect, createCaseStudy);

router.route('/:id')
    .get(getCaseStudyById)
    .put(protect, updateCaseStudy)
    .delete(protect, deleteCaseStudy);

module.exports = router;
