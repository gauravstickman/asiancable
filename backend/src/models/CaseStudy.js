const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    industry: {
        type: String,
        required: [true, 'Please add an industry']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    year: {
        type: String,
        required: [true, 'Please add a year']
    },
    client: {
        type: String,
        required: [true, 'Please add a client']
    },
    subtitle: {
        type: String,
        required: [true, 'Please add a brief/subtitle']
    },
    overview: {
        type: String,
        required: [true, 'Please add a project overview']
    },
    challenge: {
        type: String,
        required: [true, 'Please add the challenge']
    },
    solution: {
        type: String,
        required: [true, 'Please add the solution']
    },
    outcome: {
        type: String,
        required: [true, 'Please add the outcome']
    },
    specifications: {
        productsSupplied: String,
        standardsApprovals: String,
        keyCustomisation: String,
        volumeDelivered: String,
        supplyYear: String
    },
    bannerImage: {
        type: String,
        required: [true, 'Please add a banner image']
    },
    mobileBannerImage: {
        type: String,
        required: false
    },
    documentPdf: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
