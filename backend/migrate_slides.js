const mongoose = require('mongoose');

async function migrateHeroSlides() {
    await mongoose.connect('mongodb://localhost:27017/mern-admin');
    console.log("Connected to MongoDB.");

    const col = mongoose.connection.db.collection('homepagesettings');
    const doc = await col.findOne({});
    
    if (doc && doc.heroSlides) {
        let changed = false;
        const newHeroSlides = doc.heroSlides.map(slide => {
            if (slide.link || slide.page) {
                changed = true;
                const newSlide = { ...slide };
                if (!newSlide.cta) {
                    newSlide.cta = { text: slide.page || '', link: slide.link || '' };
                }
                delete newSlide.link;
                delete newSlide.page;
                return newSlide;
            }
            return slide;
        });
        
        if (changed) {
            await col.updateOne({ _id: doc._id }, { $set: { heroSlides: newHeroSlides } });
            console.log("Migrated heroSlides to use cta.");
        } else {
            console.log("No migration needed.");
        }
    }
    
    process.exit(0);
}

migrateHeroSlides();
