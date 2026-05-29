const mongoose = require('mongoose');
const schema = new mongoose.Schema({ title: String, description: String, image: String, tag: String }, { timestamps: true });
module.exports = mongoose.model('IndustryApp', schema);
