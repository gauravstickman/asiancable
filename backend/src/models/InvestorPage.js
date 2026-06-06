const mongoose = require('mongoose');

const documentItemSchema = new mongoose.Schema({
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    fileUrl: { type: String, default: '' }
});

const documentCategorySchema = new mongoose.Schema({
    categoryName: { type: String, default: '' },
    documents: [documentItemSchema]
});

const tabSchema = new mongoose.Schema({
    tabName: { type: String, default: '' },
    categories: [documentCategorySchema]
});

const governanceItemSchema = new mongoose.Schema({
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    items: [{ type: String, default: '' }]
});

const kvItemSchema = new mongoose.Schema({
    label: { type: String, default: '' },
    value: { type: String, default: '' }
});

const shareholderCardSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    items: [kvItemSchema]
});

const disclosureSchema = new mongoose.Schema({
    date: { type: String, default: '' },
    category: { type: String, default: '' },
    title: { type: String, default: '' },
    fileUrl: { type: String, default: '' }
});

const investorPageSchema = new mongoose.Schema({
    heroTitle: { type: String, default: 'Building Value Together' },
    heroDescription: { type: String, default: 'Transparent governance, strong financial performance, and sustainable growth driving shareholder value.' },
    heroDesktopImage: { type: String, default: '' },
    heroMobileImage: { type: String, default: '' },
    tabs: [tabSchema],
    corporateGovernanceTitle: { type: String, default: 'Corporate Governance' },
    corporateGovernance: [governanceItemSchema],
    shareholderInfoTitle: { type: String, default: 'Shareholder Information' },
    shareholderCards: [shareholderCardSchema],
    shareholderDocuments: [documentItemSchema],
    recentDisclosuresTitle: { type: String, default: 'Recent Disclosures' },
    recentDisclosures: [disclosureSchema]
}, { timestamps: true });

module.exports = mongoose.model('InvestorPage', investorPageSchema);
