const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
    // Main Header
    title: { type: String, default: "Let's Connect" },
    description: { type: String, default: 'Our team is ready to help with product inquiries, technical support, partnership opportunities, or any questions about Asian Cables.' },
    
    // Contact Info Cards
    addressTitle: { type: String, default: 'KEC Asian Cables Limited' },
    addressDescription: { type: String, default: '16th Floor, RPG House, 463, Dr Annie Besant Rd, Hanuman Nagar,\nWorli, Mumbai, Maharashtra, 400030' },
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
        state: { type: String, default: '' },
        city: { type: String, default: '' },
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
    networkStat2Label: { type: String, default: 'States' },

    // Our Offices Section
    officeTitle: { type: String, default: 'Our Offices & Manufacturing Facilities' },
    officeDescription: { type: String, default: 'Serving customers across India through manufacturing facilities, regional offices, and commercial hubs.' },
    officeLocations: [{
        state: { type: String, default: '' },
        city: { type: String, default: '' },
        title: { type: String, default: '' },
        company: { type: String, default: '' },
        subsidiary: { type: String, default: '' },
        address: { type: String, default: '' },
        phone: { type: String, default: '' },
        email: { type: String, default: '' }
    }],

    // Form Section
    formTitle: { type: String, default: 'General Enquiry' },
    formDescription: { type: String, default: 'Fill out the form below and our team will get back to you promptly.' }
}, { timestamps: true });

module.exports = mongoose.model('ContactPage', contactPageSchema);
