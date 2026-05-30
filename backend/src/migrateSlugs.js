const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config();

const migrateSlugs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');

        const products = await Product.find({});
        console.log(`Found ${products.length} products. Migrating slugs...`);

        let updatedCount = 0;
        for (const product of products) {
            if (!product.slug || product.slug.trim() === '') {
                const generatedSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                
                // Add a unique identifier if multiple products share the exact same name
                let finalSlug = generatedSlug;
                let counter = 1;
                while (await Product.findOne({ slug: finalSlug, _id: { $ne: product._id } })) {
                    finalSlug = `${generatedSlug}-${counter}`;
                    counter++;
                }

                product.slug = finalSlug;
                await product.save();
                console.log(`Updated product: ${product.name} -> ${product.slug}`);
                updatedCount++;
            }
        }

        console.log(`Migration Complete. Updated ${updatedCount} products.`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

migrateSlugs();
