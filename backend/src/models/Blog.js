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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory',
        required: false
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
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
