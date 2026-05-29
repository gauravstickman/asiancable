const mongoose = require('mongoose');

async function checkDb() {
    await mongoose.connect('mongodb://localhost:27017/mern-admin');
    console.log("Connected to MongoDB.");

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:");
    collections.forEach(c => console.log(c.name));

    // Check where the document 6a156cdb37c01c65b7140070 is.
    // Try homepagesettings
    const col1 = mongoose.connection.db.collection('homepagesettings');
    const doc1 = await col1.findOne({});
    console.log("\nhomepagesettings document count:", await col1.countDocuments());
    if (doc1) console.log("homepagesettings sample ID:", doc1._id);

    const col2 = mongoose.connection.db.collection('homepagesettingss');
    const doc2 = await col2.findOne({});
    console.log("\nhomepagesettingss document count:", await col2.countDocuments());
    if (doc2) console.log("homepagesettingss sample ID:", doc2._id);

    process.exit(0);
}

checkDb();
