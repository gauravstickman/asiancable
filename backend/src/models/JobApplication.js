const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    jobPosition: {
        type: String,
        required: [true, 'Job Position is required']
    },
    resumeUrl: {
        type: String,
        required: [true, 'Resume is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
