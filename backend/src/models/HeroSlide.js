const mongoose = require('mongoose');
const schema = new mongoose.Schema({ 
    page: { type: String, default: 'Homepage', required: true },
    image: String, 
    title: String, 
    description: String, 
    nextText: String,
    buttonText: String,
    buttonLink: String
}, { timestamps: true });
module.exports = mongoose.model('HeroSlide', schema);
