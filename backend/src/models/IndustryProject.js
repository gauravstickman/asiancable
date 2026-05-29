const mongoose = require('mongoose');
const schema = new mongoose.Schema({ company: String, title: String, description: String, image: String, tags: [String] }, { timestamps: true });
module.exports = mongoose.model('IndustryProject', schema);
