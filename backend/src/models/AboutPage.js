const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    value: { type: String, default: '' },
    label: { type: String, default: '' }
});

const builtOnLinkSchema = new mongoose.Schema({
    label: { type: String, default: '' },
    url: { type: String, default: '' },
    icon: { type: String, default: 'file' }
});

const valueCardSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: '' }
});

const journeyCardSchema = new mongoose.Schema({
    year: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
});

const governanceCardSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: '' }
});

const aboutPageSchema = new mongoose.Schema({
    // Hero Section
    heroTitle: { type: String, default: 'About Asian Cables' },
    heroImage: { type: String, default: '' },
    heroMobileImage: { type: String, default: '' },
    heroStats: [statSchema],

    // Built On Section
    builtOnTitle: { type: String, default: 'Built on Precision. Driven by Purpose.' },
    builtOnSubtitle: { type: String, default: 'Engineering systems that power certainty across industries, infrastructure, and everyday life.' },
    builtOnLinks: [builtOnLinkSchema],
    valueCards: [valueCardSchema],

    // Our Journey Section
    journeyTitle: { type: String, default: 'Our Journey' },
    journeyCards: [journeyCardSchema],

    // Governance Section
    governanceTitle: { type: String, default: 'Shaped By Governance. Built On Quality. Proven Across Critical Applications.' },
    
    // Primary Governance Card (Fixed)
    governancePrimaryTitle: { type: String, default: '' },
    governancePrimaryDescription: { type: String, default: '' },
    governancePrimaryIcon: { type: String, default: '' },

    // Dynamic Governance Cards
    governanceCards: [governanceCardSchema],

    // Leadership Team Section
    leadershipTitle: { type: String, default: 'Leadership Team' },
    leadershipSubtitle: { type: String, default: 'Meet the visionaries driving Asian Cables forward' },
    leadershipButtonLabel: { type: String, default: 'View Leadership' },
    leadershipButtonUrl: { type: String, default: '#' },
    leadershipMembers: [{
        name: { type: String, default: '' },
        designation: { type: String, default: '' },
        image: { type: String, default: '' },
        linkedin: { type: String, default: '' }
    }]

}, { timestamps: true });

module.exports = mongoose.model('AboutPage', aboutPageSchema);
