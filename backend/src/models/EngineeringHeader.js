const mongoose = require('mongoose');
const schema = new mongoose.Schema({ heading: String, image: String }, { timestamps: true });
module.exports = mongoose.model('EngineeringHeader', schema);
