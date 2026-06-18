const express = require('express');
const { submitApplication } = require('../controllers/jobApplicationController');
const { uploadS3 } = require('../middleware/uploadS3');

const router = express.Router();

router.post('/', uploadS3.single('resume'), submitApplication);

module.exports = router;
