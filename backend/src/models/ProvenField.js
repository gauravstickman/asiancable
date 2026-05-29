const mongoose = require('mongoose');
const schema = new mongoose.Schema({ tag: String, title: String, description: String, image: String, badges: String }, { timestamps: true });
module.exports = mongoose.model('ProvenField', schema);
