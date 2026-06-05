const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IndustryPage',
        required: false
    },
    description: {
        type: String,
    },
    specifications: [{
        label: String,
        value: String,
        icon: String
    }],
    idealFor: [{
        type: String
    }],
    overviewDescription: {
        type: String,
    },
    overviewImage: {
        type: String,
    },
    standards: [{
        type: String
    }],
    catalogueName: String,
    catalogueDescription: String,
    catalogueImage: String,
    cataloguePdf: String,
    applications: [{
        title: String,
        description: String,
        image: String,
        link: { type: String, default: '' }
    }],
    projects: [{
        tag: String,
        title: String,
        description: String,
        image: String,
        badges: [String]
    }],
    stats: [{
        value: String,
        label: String
    }],
    features: [{
        type: String
    }],
    featuresImage: {
        type: String,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
