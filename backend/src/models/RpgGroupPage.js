const mongoose = require('mongoose');

const rpgGroupPageSchema = new mongoose.Schema({
    // Hero Section
    heroTitle: { type: String, default: 'Building Futures. Driving Growth.' },
    heroDescription: { type: String, default: 'One of India\'s fastest growing conglomerates.' },
    heroImage: { type: String, default: '' },
    heroMobileImage: { type: String, default: '' },

    // Global Presence Section
    globalTitle: { type: String, default: 'Global Presence' },
    globalDescription: { type: String, default: 'Operating across 135+ countries with world-class manufacturing and distribution facilities' },
    globalImage: { type: String, default: '' },
    globalMainStats: [{
        value: { type: String },
        label: { type: String }
    }],
    globalCards: [{
        value: { type: String },
        label: { type: String }
    }],

    // RPG Group Info Section
    infoHeading: { type: String },
    infoDescriptions: [{ type: String }],
    infoButtonText: { type: String, default: 'Visit RPG Website' },
    infoButtonUrl: { type: String, default: 'https://rpggroup.com' },
    infoImage: { type: String, default: '' },

    // Group Ecosystem Section
    ecosystemTitle: { type: String, default: 'RPG Group Ecosystem' },
    ecosystemCards: [{
        title: { type: String },
        image: { type: String },
        url: { type: String }
    }],

    // Core Values Section
    coreValuesTitle: { type: String, default: 'Core Values' },
    coreValuesCards: [{
        title: { type: String },
        desc: { type: String },
        icon: { type: String }
    }],

    // Business Verticals Section
    verticalsTitle: { type: String, default: 'Business Verticals' },
    verticalsDescription: { type: String, default: 'A diverse portfolio spanning key sectors of the global economy.' },
    verticalsCards: [{
        title: { type: String },
        image: { type: String }
    }],

    // FAQ Section
    faqTitle: { type: String, default: 'Frequently Asked Questions' },
    faqs: [{
        question: { type: String },
        answer: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('RpgGroupPage', rpgGroupPageSchema);
