const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
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
    company: {
        type: String
    },
    inquiryType: {
        type: String,
        required: [true, 'Inquiry Type is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
