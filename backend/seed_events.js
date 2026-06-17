const mongoose = require('mongoose');
const Event = require('./src/models/Event');
require('dotenv').config({ path: './.env' });

async function seedEvents() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const events = [
            {
                title: "Global Cable Tech Expo 2026",
                slug: "global-cable-tech-expo-2026",
                location: "Pragati Maidan, New Delhi, India",
                duration: "October 15 - October 18, 2026",
                description: "Join Asian Cables at the world's premier cable and wire exhibition. We will be showcasing our latest high-voltage solutions and advanced sustainable manufacturing techniques. Meet our engineers and discover the future of power transmission.",
                bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                galleryImages: [
                    "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ],
                status: "published"
            },
            {
                title: "Sustainability Summit: Wiring the Future",
                slug: "sustainability-summit-wiring-the-future",
                location: "Mumbai Convention Centre, Mumbai",
                duration: "November 10 - November 11, 2026",
                description: "A two-day summit hosted by Asian Cables focusing on eco-friendly industrial practices. Learn how the cable industry can achieve net-zero emissions through recycling, energy efficiency, and innovative material science.",
                bannerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                galleryImages: [
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ],
                status: "published"
            }
        ];

        // Insert or update events
        for (const event of events) {
            await Event.findOneAndUpdate(
                { slug: event.slug },
                event,
                { upsert: true, new: true }
            );
            console.log(`Upserted Event: ${event.title}`);
        }

        console.log('Successfully seeded 2 Events!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding events:', error);
        process.exit(1);
    }
}

seedEvents();
