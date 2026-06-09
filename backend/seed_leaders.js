const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AboutPage = require('./src/models/AboutPage');

// Load env vars
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/asian_cables';

const seedLeaders = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');

        let about = await AboutPage.findOne();
        if (!about) {
            about = new AboutPage();
        }

        about.leadershipMembers = [
            {
                name: "Cameron Williamson",
                designation: "Senior Sustainability Consultant",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
                linkedin: "https://linkedin.com",
            },
            {
                name: "Courtney Henry",
                designation: "Energy Analysts",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
                linkedin: "https://linkedin.com",
            },
            {
                name: "Dianne Russell",
                designation: "Senior Renewable Energy Engineer",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
                linkedin: "https://linkedin.com",
            }
        ];

        await about.save();
        console.log('Successfully seeded leadership members!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedLeaders();
