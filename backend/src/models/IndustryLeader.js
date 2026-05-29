const mongoose = require('mongoose');
const schema = new mongoose.Schema({ title: String, image: String }, { timestamps: true });
module.exports = mongoose.model('IndustryLeader', schema);
