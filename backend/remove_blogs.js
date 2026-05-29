const mongoose = require('mongoose');

async function removeHomepageBlogs() {
    await mongoose.connect('mongodb://localhost:27017/mern-admin');
    console.log("Connected to MongoDB.");

    const col = mongoose.connection.db.collection('homepagesettings');
    const result = await col.updateOne({}, { $unset: { homepageBlogs: "" } });
    
    console.log("Modified count:", result.modifiedCount);
    console.log("homepageBlogs field removed from database.");
    
    process.exit(0);
}

removeHomepageBlogs();
