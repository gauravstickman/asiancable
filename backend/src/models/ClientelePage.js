const mongoose = require('mongoose');

const clientelePageSchema = new mongoose.Schema({
    // Hero Section
    heroTitle: { type: String, default: 'Trusted By Industry Leaders' },
    heroDesktopImage: { type: String, default: '' },
    heroMobileImage: { type: String, default: '' },
    stat1Number: { type: String, default: '2500+' },
    stat1Label: { type: String, default: 'Employees' },
    stat2Number: { type: String, default: '15+' },
    stat2Label: { type: String, default: 'Locations' },
    stat3Number: { type: String, default: '50+' },
    stat3Label: { type: String, default: 'Open Positions' },
    heroStats: [{
        value: { type: String, default: '' },
        label: { type: String, default: '' }
    }],

    // Regions Filter Tab
    regions: [{
        name: { type: String, default: '' },
        icon: { type: String, default: '' }
    }],

    // Industries Filter Tab
    industries: [{ type: String, default: '' }],

    // Clients Array
    clients: [{
        name: { type: String, default: '' },
        logo: { type: String, default: '' },
        location: { type: String, default: '' },
        industry: { type: String, default: '' },
        region: { type: String, default: '' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('ClientelePage', clientelePageSchema);
