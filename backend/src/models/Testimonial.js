const mongoose = require('mongoose');
const schema = new mongoose.Schema({ text: String, name: String, role: String, image: String }, { timestamps: true });
module.exports = mongoose.model('Testimonial', schema);
