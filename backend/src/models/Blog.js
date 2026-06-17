const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    sections: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        images: [{ type: String }]
    }],
    author: {
        name: { type: String, default: '' },
        bio: { type: String, default: '' },
        image: { type: String, default: '' },
        linkedin: { type: String, default: '' }
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published'
    },
    readTime: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
