const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    value: { type: String, default: '' },
    label: { type: String, default: '' }
});

const infrastructureHighlightSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
});

const productionUnitSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    image: { type: String, default: '' }
});

const featureCardSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
});

const certificationSchema = new mongoose.Schema({
    logo: { type: String, default: '' },
    name: { type: String, default: '' },
    description: { type: String, default: '' }
});

const qualityItemSchema = new mongoose.Schema({
    type: { type: String, default: 'certification' },
    logo: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    file: { type: String, default: '' }
});

const manufacturingPageSchema = new mongoose.Schema({
    // Hero Section
    heroTitle: { type: String, default: 'State-of-the-Art Manufacturing' },
    heroDescription: { type: String, default: 'Delivering world-class cable manufacturing with cutting-edge technology and unmatched precision.' },
    heroBgImage: { type: String, default: '' },
    heroMobileBgImage: { type: String, default: '' },
    heroStats: [statSchema],

    // Infrastructure Highlights Section
    infraTitle: { type: String, default: 'Infrastructure Highlights' },
    infraBadgeText: { type: String, default: 'Zero Accidents' },
    infraImage: { type: String, default: '' },
    infraDescription: { type: String, default: 'Manufacturing is distributed across two specialised facilities in Vadodara and Mysuru, each aligned to specific cable categories and voltage ranges.' },
    infraReadMoreLink: { type: String, default: '/manufacturing' },
    infraHighlights: [infrastructureHighlightSchema],

    // Production Units Section
    productionTitle: { type: String, default: 'Production Units' },
    productionSubtitle: { type: String, default: '12 state-of-the-art facilities strategically located across India' },
    productionUnits: [productionUnitSchema],

    // Built for Global Infrastructure Standards Section
    globalTitle: { type: String, default: 'Built for Global Infrastructure Standards' },
    // Standards Card
    standardsCardTitle: { type: String, default: 'Standards-Led Manufacturing' },
    standardsCardDescription: { type: String, default: 'Manufacturing is aligned to internationally recognised standards including IEC, BS, AS/NZS, and IS, ensuring consistent performance across diverse infrastructure applications.' },
    standardsCardStats: [statSchema],
    // Feature Cards
    featureCards: [featureCardSchema],
    // International Certifications
    certificationsTitle: { type: String, default: 'International Certifications' },
    certifications: [certificationSchema],

    // Quality Control & Assurance Section
    qualityTitle: { type: String, default: 'Quality Control & Assurance' },
    qualityViewAllLink: { type: String, default: '/quality' },
    qualityItems: [qualityItemSchema]

}, { timestamps: true });

module.exports = mongoose.model('ManufacturingPage', manufacturingPageSchema);
