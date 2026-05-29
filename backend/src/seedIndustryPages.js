const mongoose = require('mongoose');
const dotenv = require('dotenv');
const IndustryPage = require('./models/IndustryPage');

dotenv.config();

const industryPages = [
  { name: 'Oil & Gas', slug: 'oil-gas' },
  { name: 'Solar', slug: 'solar' },
  { name: 'Wind Energy', slug: 'wind-energy' },
  { name: 'EV Charging', slug: 'ev-charging' },
  { name: 'Power & Transmission', slug: 'power-transmission' },
  { name: 'Mining', slug: 'mining' },
  { name: 'Marine', slug: 'marine' }
];

const seedIndustryPages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin');
        console.log('Connected to DB...');

        for (const page of industryPages) {
            const exists = await IndustryPage.findOne({ slug: page.slug });
            if (!exists) {
                await IndustryPage.create(page);
                console.log(`Created: ${page.name}`);
            } else {
                console.log(`Already exists: ${page.name}`);
            }
        }

        console.log('Industry Pages Seeded Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding industry pages:', error);
        process.exit(1);
    }
};

seedIndustryPages();
