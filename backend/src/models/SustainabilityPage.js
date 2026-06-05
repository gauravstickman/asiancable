const mongoose = require('mongoose');

const sustainabilityPageSchema = new mongoose.Schema({
    heroTitle: { type: String, default: 'Sustainability' },
    heroImage: { type: String, default: '' },
    heroMobileImage: { type: String, default: '' },
    stats: [{
        value: { type: String, default: '' },
        label: { type: String, default: '' }
    }],
    ourSustainabilityTitle: { type: String, default: 'Our Sustainability' },
    ourSustainabilityDescription: { type: String, default: '' },
    ourSustainabilityImage: { type: String, default: '' },
    commitmentsTitle: { type: String, default: 'Our Commitments' },
    commitments: [{
        icon: { type: String, default: '' },
        text: { type: String, default: '' }
    }],
    certificationsTitle: { type: String, default: 'Certifications & Accreditations' },
    certifications: [{
        image: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    highlightsTitle: { type: String, default: 'Sustainability Highlights' },
    highlights: [{
        image: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('SustainabilityPage', sustainabilityPageSchema);
