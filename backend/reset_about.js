const mongoose = require('mongoose');
require('dotenv/config');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin';

mongoose.connect(MONGO_URI).then(async () => {
    console.log('Connected to DB:', MONGO_URI);
    try {
        const result = await mongoose.connection.db.dropCollection('aboutpages');
        console.log('Dropped aboutpages collection:', result);
    } catch (e) {
        console.log('Collection may not exist:', e.message);
    }
    console.log('Done! Restart backend and visit /admin/about-page to auto-create fresh data.');
    process.exit(0);
});
