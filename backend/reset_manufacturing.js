const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB:', process.env.MONGO_URI);
        
        const result = await mongoose.connection.db.collection('manufacturingpages').drop();
        console.log('Dropped manufacturingpages collection:', result);
        
        console.log('Done! Restart backend and visit /admin/manufacturing-page to auto-create fresh data.');
        process.exit(0);
    } catch (err) {
        if (err.message.includes('ns not found')) {
            console.log('Collection does not exist yet - nothing to drop. You are good to go!');
            process.exit(0);
        }
        console.error('Error:', err);
        process.exit(1);
    }
};

run();
