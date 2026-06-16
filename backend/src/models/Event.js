const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        default: ''
    },
    duration: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    bannerImage: {
        type: String,
        default: ''
    },
    galleryImages: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published'
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
