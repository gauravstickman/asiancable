const mongoose = require('mongoose');
const schema = new mongoose.Schema({ presence: mongoose.Schema.Types.Mixed, decades: mongoose.Schema.Types.Mixed, capacity: mongoose.Schema.Types.Mixed, annual: mongoose.Schema.Types.Mixed }, { timestamps: true });
module.exports = mongoose.model('HomepageFact', schema);
