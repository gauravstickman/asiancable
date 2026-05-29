const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homepage = require('./src/models/Homepage');

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin');
        console.log('Connected to MongoDB');
        
        const homepage = await Homepage.findOne();
        if (!homepage) {
            console.log('No homepage document found!');
        } else {
            console.log('HOMEPAGE DOCUMENT:');
            console.log(JSON.stringify(homepage.toObject(), null, 2));
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

check();
