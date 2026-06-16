const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { uploadS3 } = require('../middleware/uploadS3');
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

router.route('/')
    .get(getEvents)
    .post(protect, uploadS3.single('bannerImage'), createEvent);

router.route('/:id')
    .get(getEventById)
    .put(protect, uploadS3.single('bannerImage'), updateEvent)
    .delete(protect, deleteEvent);

module.exports = router;
