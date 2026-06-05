const mongoose = require('mongoose');

const resourcesPageSchema = new mongoose.Schema({
    heroTitle: { type: String, default: 'Resources' },
    heroSubtitle: { type: String, default: 'Access our resource library to arrive at an informed decision.' },
    heroImage: { type: String, default: '' },
    heroMobileImage: { type: String, default: '' },
    featuredTool: {
        icon: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        buttonText: { type: String, default: '' },
        buttonLink: { type: String, default: '' },
        backgroundImage: { type: String, default: '' }
    },
    toolsList: [{
        icon: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    whitepapersTitle: { type: String, default: 'Whitepapers & Research' },
    whitepapersViewAllLink: { type: String, default: '' },
    whitepapersList: [{
        icon: { type: String, default: '' },
        title: { type: String, default: '' },
        author: { type: String, default: '' },
        date: { type: String, default: '' },
        description: { type: String, default: '' },
        downloadLink: { type: String, default: '' },
        downloadText: { type: String, default: 'Download' }
    }],
    blogsTitle: { type: String, default: 'Technical Blogs & Insights' },
    blogsSubtitle: { type: String, default: 'Industry trends, technical articles, and expert opinions from our team' },
    blogsCategories: [{ type: String }],
    blogsFeaturedTitle: { type: String, default: 'Featured Articles' },
    featuredBlogs: [{
        isFeatured: { type: Boolean, default: false },
        image: { type: String, default: '' },
        category: { type: String, default: '' },
        readTime: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        author: { type: String, default: '' },
        date: { type: String, default: '' },
        link: { type: String, default: '' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('ResourcesPage', resourcesPageSchema);
