const mongoose = require('mongoose');
const CaseStudy = require('./src/models/CaseStudy');

mongoose.connect('mongodb://localhost:27017/mern-admin').then(async () => {
  const c = await CaseStudy.findOne({ title: 'Smart City Data Center Connectivity New' });
  if (c) {
    c.slug = 'smart-city-data-center-connectivity-new';
    await c.save();
    console.log('Fixed slug to: ' + c.slug);
  } else {
    console.log('Not found');
  }
  mongoose.disconnect();
});
