const mongoose = require('mongoose');

const leadershipPageSchema = new mongoose.Schema({
    heroTitle: { type: String, default: 'Leadership' },
    heroDescription: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    heroMobileImage: { type: String, default: '' },
    
    // Global Section
    globalTitle: { type: String, default: 'Global' },
    globalDescription: { type: String, default: '' },
    globalImage: { type: String, default: '' },
    globalMainStats: [{
        value: { type: String, default: '' },
        label: { type: String, default: '' }
    }],
    globalCards: [{
        value: { type: String, default: '' },
        label: { type: String, default: '' }
    }],
    
    // Group Information Section
    groupTitle: { type: String, default: 'A 5.2Bn Group with Businesses from major sectors of the economy.' },
    groupImage: { type: String, default: '' },
    groupDescription: { type: String, default: 'The RPG Group is one of India\'s leading diversified business conglomerates, built on a foundation of ethical leadership...' },
    groupLinkUrl: { type: String, default: '#' },
    
    // Ecosystem Section
    ecosystemTitle: { type: String, default: 'The RPG Group Ecosystem' },
    ecosystemSubtitle: { type: String, default: 'A diversified conglomerate with leading brands across multiple industries' },
    ecosystemCards: [{
        logo: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    
    // Core Values Section
    valuesTitle: { type: String, default: 'Core Values' },
    valuesCards: [{
        icon: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    
    // Business Verticals Section
    verticalsTitle: { type: String, default: 'Business Verticals' },
    verticalsCards: [{
        icon: { type: String, default: '' },
        title: { type: String, default: '' }
    }],
    
    // FAQ Section
    faqTitle: { type: String, default: 'Frequently Asked Questions' },
    faqs: [{
        question: { type: String, default: '' },
        answer: { type: String, default: '' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('LeadershipPage', leadershipPageSchema);
