const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    value: String,
    label: String
});

const projectSchema = new mongoose.Schema({
    company: String,
    title: String,
    description: String,
    image: String,
    tags: [String]
});

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String
});

const impactSchema = new mongoose.Schema({
    icon: String,
    title: String,
    description: String
});

const applicationSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    tag: String
});

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    // Hero Header
    headerBgImage: { type: String, default: '/src/assets/industry-main.png' },
    headerTag: { type: String, default: 'Industries' },
    headerTitle: { type: String, default: 'Oil & Gas' },
    headerDescription: { type: String, default: 'Enabling uninterrupted operations across upstream...' },
    stats: [statSchema],

    // Proven Projects
    provenProjectsTitle: { type: String, default: 'Proven In The Field' },
    provenProjectsSubtitle: { type: String, default: 'Real projects. Demanding environments. Reliable outcomes.' },
    projects: [projectSchema],

    // Trusted Leaders
    trustedTitle: { type: String, default: 'Trusted by Industry Leaders' },
    trustedLogos: [String],

    // Cables / Products
    productsTitle: { type: String, default: 'Cables for Oil & Gas' },
    products: [productSchema],

    // Impact
    impactTitle: { type: String, default: 'Asian Cables Impact' },
    impacts: [impactSchema],

    // Applications
    applicationsTitle: { type: String, default: 'Applications' },
    applications: [applicationSchema]
}, { timestamps: true });

module.exports = mongoose.model('IndustryPage', schema);
