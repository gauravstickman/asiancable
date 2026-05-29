const mongoose = require('mongoose');

async function cleanAboutUs() {
    await mongoose.connect('mongodb://localhost:27017/mern-admin');
    console.log("Connected to MongoDB.");

    const col = mongoose.connection.db.collection('homepagesettings');
    const doc = await col.findOne({});
    
    if (doc && doc.aboutUs) {
        const result = await col.updateOne(
            { _id: doc._id }, 
            { $unset: { 
                "aboutUs.tagline": "",
                "aboutUs.title": "",
                "aboutUs.image": "",
                "aboutUs.ctaText": "",
                "aboutUs.ctaLink": "",
                "aboutUs.stats": ""
            } }
        );
        console.log("Cleaned aboutUs fields. Modified:", result.modifiedCount);
    } else {
        console.log("No document found to clean.");
    }
    
    process.exit(0);
}

cleanAboutUs();
