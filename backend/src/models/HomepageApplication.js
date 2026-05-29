const mongoose = require('mongoose');
const schema = new mongoose.Schema({ main: mongoose.Schema.Types.Mixed, small1: mongoose.Schema.Types.Mixed, small2: mongoose.Schema.Types.Mixed, wide: mongoose.Schema.Types.Mixed }, { timestamps: true });
module.exports = mongoose.model('HomepageApplication', schema);
