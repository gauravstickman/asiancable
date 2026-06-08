const mongoose = require('mongoose');

const cultureValueSchema = new mongoose.Schema({
    icon: String,
    title: String,
    description: String
});

const testimonialSchema = new mongoose.Schema({
    quote: String,
    name: String,
    role: String,
    image: String
});

const experienceCardSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String
});

const experiencePointSchema = new mongoose.Schema({
    title: String,
    heading: String,
    description: String,
    image: String,
    cards: [experienceCardSchema]
});

const schema = new mongoose.Schema({
    // Hero Section
    headerBgImage: { type: String, default: '/assets/Lifeofasiancables/ImageWithFallback.png' },
    headerMobileBgImage: { type: String, default: '' },
    headerTag: { type: String, default: 'Culture' },
    headerTitle: { type: String, default: 'Your Connection to Brighter Future' },
    headerDescription: { type: String, default: 'At Asian Cables, part of RPG Group, we don\'t just manufacture wires and cables...' },
    headerLinkUrl: { type: String, default: '/careers' },

    // Why Work Section
    whyWorkImage: { type: String, default: '/assets/Lifeofasiancables/whywork.png' },
    whyWorkTitle: { type: String, default: 'Why Work at Asian Cables' },
    whyWorkDescription1: { type: String, default: 'Founded in 1959, Asian Cables has been a pioneer in delivering quality wires and cables...' },
    whyWorkDescription2: { type: String, default: 'When you join Asian Cables, you don\'t just build a career — you help power progress.' },

    // Culture Values Section
    cultureTitle: { type: String, default: 'The Values That Connect Us' },
    cultureDescription: { type: String, default: 'At Asian Cables, our work is driven by a shared commitment to excellence, integrity, and innovation. Here is what defines our culture:' },
    cultureValues: [cultureValueSchema],

    // Experience Section
    experienceImage: { type: String, default: '/assets/Lifeofasiancables/Image.png' },
    experienceTitle: { type: String, default: 'Experience that Powers Your Growth' },
    experienceDescription: { type: String, default: 'Our people are our greatest strength. That is why we invest heavily in their development and well-being.' },
    experiencePoints: [experiencePointSchema],

    // Testimonials Section
    testimonialsTitle: { type: String, default: 'Voices from the Floor' },
    testimonials: [testimonialSchema],

    // Day In Life Section
    dayInLifeTitle: { type: String, default: 'A Day in the Life' },
    dayInLifeDescription: { type: String, default: 'Experience the energy of our shop floors, the collaboration in our offices, and the passion that drives every Asian Cables team member.' },
    dayInLifeVideo: { type: String, default: '' },
    dayInLifeImage: { type: String, default: '/assets/Lifeofasiancables/Image2.png' },

    // Life Beyond Work Section
    lifeBeyondTitle: { type: String, default: 'Life Beyond Work' },
    lifeBeyondDescription: { type: String, default: 'We believe in celebrating our successes, giving back to the community, and ensuring our employees enjoy a healthy work-life balance.' },
    lifeBeyondImages: [{ type: String }],

    // Open Roles Section
    openRolesTitle: { type: String, default: 'Ready to Power Progress?' },
    openRolesDescription: { type: String, default: 'Explore our current openings and find where your skills can make the biggest impact.' },
    openRolesLink: { type: String, default: '/careers' }
}, { timestamps: true });

module.exports = mongoose.model('LifeAtAsianCablesPage', schema);
