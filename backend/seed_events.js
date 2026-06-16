require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./src/models/Event');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin';

const seedEvents = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');

        const dummyEvents = [];
        for (let i = 1; i <= 5; i++) {
            dummyEvents.push({
                title: `Wire & Cable India Exhibition 202${i + 4}`,
                slug: `wire-cable-india-exhibition-202${i + 4}-${Date.now() + i}`,
                location: 'Pragati Maidan, New Delhi',
                duration: '4-Day Exhibition',
                description: 'Asian Cables participated in Wire & Cable India — one of India\'s most significant platforms for the wire, cable, and allied industries. The event brought together manufacturers, EPC companies, consultants, infrastructure developers, OEMs, and distribution partners from across India and internationally.',
                bannerImage: '', // Blank placeholder
                galleryImages: ['', '', ''], // 3 empty placeholders (or dummy images if preferred, but schema allows empty if it passes backend, wait: my backend has no required validation for gallery items but frontend does. I'll just leave them empty strings)
                status: 'published'
            });
        }

        await Event.insertMany(dummyEvents);
        console.log('Successfully inserted 5 dummy events.');

        process.exit(0);
    } catch (err) {
        console.error('Error seeding events:', err);
        process.exit(1);
    }
};

seedEvents();
