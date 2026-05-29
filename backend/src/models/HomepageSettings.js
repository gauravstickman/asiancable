const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    heroSlides: [{
        title: String,
        subtitle: String,
        cta: {
            text: String,
            link: String
        },
        image: String
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
        main: { title: String, description: String, image: String },
        small1: { title: String, image: String },
        small2: { title: String, image: String },
        wide: { title: String, image: String }
    },
    provenFields: [{
        tag: String,
        title: String,
        description: String,
        image: String,
        badges: [String]
    }],
    engineering: {
        tagline: String,
        title: String,
        description: String,
        items: [{
            title: String,
            description: String,
            icon: String,
            hoverColor: String,
            link: String
        }]
    },

}, { timestamps: true, collection: 'homepagesettings' });

module.exports = mongoose.model('HomepageSettings', schema);
