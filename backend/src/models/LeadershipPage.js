const mongoose = require('mongoose');

const leadershipPageSchema = new mongoose.Schema({
    // Hero Section
    heroTitle: { type: String, default: 'Leadership That Drives Performance' },
    heroDescription: { type: String, default: 'A team of experienced industry leaders bringing deep expertise across manufacturing, engineering, and infrastructure, guiding the organisation with clarity, discipline, and long-term vision.' },
    heroFeaturedImage: { type: String, default: '' },
    heroFeaturedName: { type: String, default: 'Cameron Williamson' },
    heroFeaturedRole: { type: String, default: 'MD & CEO' },
    
    // Spotlight Section
    spotlightTitle: { type: String, default: 'Leadership Spotlight' },
    spotlightSubtitle: { type: String, default: 'Click on a leader to explore their vision and expertise' },
    spotlightLeaders: [{
        image: { type: String, default: '' },
        name: { type: String, default: '' },
        role: { type: String, default: '' },
        linkedinUrl: { type: String, default: '' }
    }],
    
    // Board of Directors Section
    boardTitle: { type: String, default: 'Board of Directors' },
    boardSubtitle: { type: String, default: 'Meet our board members' },
    boardMembers: [{
        image: { type: String, default: '' },
        name: { type: String, default: '' },
        role: { type: String, default: '' },
        linkedinUrl: { type: String, default: '' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('LeadershipPage', leadershipPageSchema);
