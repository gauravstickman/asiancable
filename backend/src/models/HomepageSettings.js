const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    heroSlides: [{
        title: String,
        description: String,
        nextText: String,
        cta: {
            text: String,
            link: String
        },
        image: String,
        mobileImage: String
    }],
    aboutUs: {
        description: String
    },
    testimonials: [{
        name: String,
        position: String,
        company: String,
        quote: String,
        image: String,
        rating: Number
    }],
    facts: {
        presence: {
            title: String,
            description: String,
            image: String
        },
        decades: {
            title: String,
            subtitle: String,
            description: String
        },
        capacity: {
            title: String,
            subtitle: String,
            description: String
        },
        annual: {
            value: String,
            title: String,
            description: String,
            image: String
        }
    },
    applications: {
        main: { title: String, description: String, image: String, link: { type: String, default: '' } },
        small1: { title: String, image: String, link: { type: String, default: '' } },
        small2: { title: String, image: String, link: { type: String, default: '' } },
        wide: { title: String, image: String, link: { type: String, default: '' } }
    },
    provenFields: [{
        tag: String,
        title: String,
        description: String,
        image: String,
        link: { type: String, default: '' },
        badges: [String]
    }],
    engineering: {
        title: String,
        items: [{
            title: String,
            content: String,
            image: String
        }]
    },
    productRange: [{
        title: String,
        image: String,
        points: [String],
        link: String
    }],
    sustainability: {
        bgImage: String,
        heading: String,
        primaryBtnText: String,
        primaryBtnLink: String,
        secondaryBtnText: String,
        secondaryBtnLink: String,
        features: [{
            title: String,
            description: String,
            icon: String
        }]
    },
    latestBlogs: [{
        tag: String,
        title: String,
        description: String,
        image: String,
        link: String
    }],

}, { timestamps: true, collection: 'homepagesettings' });

module.exports = mongoose.model('HomepageSettings', schema);
