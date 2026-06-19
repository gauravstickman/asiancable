require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const ResourcesPage = require('./src/models/ResourcesPage');

const fixSeed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin');
        console.log("Connected to MongoDB.");

        let doc = await ResourcesPage.findOne();
        if (doc) {
            // Get the original single resource
            const originalResource = doc.productResource || {
                title: "Product Catalogue",
                description: "A comprehensive guide.",
                image: "/assets/resources/img-1.jpg",
                icon: "/assets/resources/folderIcons.png",
                file: "/assets/resources/catalogue.pdf",
                fileSize: "PDF • 2.4 MB",
                requestText: "Request Datasheet"
            };

            // Remove it from the list if it's already there to prevent duplicates
            doc.productResourcesList = doc.productResourcesList.filter(
                r => r.title !== originalResource.title && r.title !== "Product Catalogue"
            );

            // Add it to the beginning of the list
            doc.productResourcesList.unshift(originalResource);

            await doc.save();
            console.log("Successfully added the original 'Product Catalogue' as the first item.");
        } else {
            console.log("No document found.");
        }
        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
};

fixSeed();
