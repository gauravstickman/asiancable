const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
    // Main Header
    title: { type: String, default: "Let's Connect" },
    description: { type: String, default: 'Our team is ready to help with product inquiries, technical support, partnership opportunities, or any questions about Asian Cables.' },
    
    // Contact Info Cards
    phoneTitle: { type: String, default: '+91 22 1234 5678' },
    phoneSubtitle: { type: String, default: 'Mon-Sat, 9AM-6PM IST' },
    emailTitle: { type: String, default: 'info@asiancables.com' },
    emailSubtitle: { type: String, default: 'Response within 24 hours' },
    distributorTitle: { type: String, default: 'Find Distributor' },
    distributorSubtitle: { type: String, default: 'Get distributor details around you' },
    distributorLinkUrl: { type: String, default: '/distributors' },
    
    // Customer Support Block
    supportTitle: { type: String, default: 'Customer Support' },
    supportDescription: { type: String, default: 'Technical support, product queries, and after-sales assistance available round the clock.' },
    supportStatus: { type: String, default: 'Online 24/7' },
    
    // Grievance Redressal Block
    grievanceTitle: { type: String, default: 'Grievance Redressal' },
    grievanceDescription: { type: String, default: 'Report issues for prompt resolution. We guarantee response within 48 hours.' },
    grievanceStatus: { type: String, default: '48hr Response Guaranteed' },
    
    // Distributors Section
    distributorSectionTitle: { type: String, default: 'Find Distributors & Dealers' },
    distributorsList: [{
        name: { type: String, default: '' },
        address: { type: String, default: '' },
        phone: { type: String, default: '' },
        link: { type: String, default: '' }
    }],
    
    // Nationwide Network Block
    networkTitle: { type: String, default: 'Nationwide Network' },
    networkDescription: { type: String, default: '500+ distributors and dealers across all major cities in India.' },
    networkStat1Number: { type: String, default: '500+' },
    networkStat1Label: { type: String, default: 'Dealers' },
    networkStat2Number: { type: String, default: '28' },
    networkStat2Label: { type: String, default: 'States' }
}, { timestamps: true });

module.exports = mongoose.model('ContactPage', contactPageSchema);
