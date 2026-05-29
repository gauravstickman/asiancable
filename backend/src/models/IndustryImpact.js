const mongoose = require('mongoose');
const schema = new mongoose.Schema({ title: String, description: String, icon: String }, { timestamps: true });
module.exports = mongoose.model('IndustryImpact', schema);
