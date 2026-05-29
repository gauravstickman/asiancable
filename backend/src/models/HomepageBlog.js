const mongoose = require('mongoose');
const schema = new mongoose.Schema({ tag: String, title: String, description: String, image: String }, { timestamps: true });
module.exports = mongoose.model('HomepageBlog', schema);
