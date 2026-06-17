const mongoose = require('mongoose');
const LifeAtAsianCablesPage = require('./src/models/LifeAtAsianCablesPage');
require('dotenv').config({ path: './.env' });

async function seedRoles() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let page = await LifeAtAsianCablesPage.findOne();
        if (!page) {
            page = new LifeAtAsianCablesPage();
        }

        page.openRoles = [
            {
                category: "Engineering",
                title: "Lead Production Engineer",
                location: "Nashik, India",
                experience: "10-15 years experience",
                salary: "₹18-25 LPA",
                applyLink: "mailto:careers@asiancables.com"
            },
            {
                category: "Quality",
                title: "Quality Inspector (Cables)",
                location: "Pune, India",
                experience: "3-5 years experience",
                salary: "₹6-9 LPA",
                applyLink: "mailto:careers@asiancables.com"
            },
            {
                category: "Marketing",
                title: "Digital Marketing Strategist",
                location: "Mumbai, India",
                experience: "4-7 years experience",
                salary: "₹8-12 LPA",
                applyLink: "mailto:careers@asiancables.com"
            },
            {
                category: "Sales",
                title: "Regional Sales Manager",
                location: "Delhi, India",
                experience: "7-10 years experience",
                salary: "₹12-18 LPA",
                applyLink: "mailto:careers@asiancables.com"
            }
        ];
        
        page.openRolesDescription = "4 positions open";

        await page.save();
        console.log('Successfully seeded 4 different Open Roles!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedRoles();
