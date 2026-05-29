const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

// Load env vars
dotenv.config();

const categories = [
    {
        name: 'Low Voltage Cables',
        slug: 'low-voltage-cables',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
        points: ['Power Cables (1.1kV)', 'Control Cables', 'Aerial Bunched Cables', 'Railway Signalling Cables']
    },
    {
        name: 'Medium Voltage Cables',
        slug: 'medium-voltage-cables',
        image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?q=80&w=2000&auto=format&fit=crop',
        points: ['XLPE Insulated Power Cables', 'Paper Insulated Lead Covered', 'EHV Cables up to 66kV', 'Submarine Cables']
    },
    {
        name: 'Fire Survival & LSZH Cables',
        slug: 'fire-survival-lszh-cables',
        image: 'https://images.unsplash.com/photo-1563200780-692b1a82d2bb?q=80&w=2000&auto=format&fit=crop',
        points: ['Low Smoke Zero Halogen', 'Fire Survival Rated', 'Enhanced Circuit Integrity', 'Toxic Gas Emission Free']
    },
    {
        name: 'Specialized Cables',
        slug: 'specialized-cables',
        image: 'https://images.unsplash.com/photo-1620825937374-87fc7d6adf1e?q=80&w=2000&auto=format&fit=crop',
        points: ['Solar DC Cables', 'EV Charging Cables', 'Instrumentation Cables', 'Mining Cables']
    },
    {
        name: 'Housing Wires & Flexibles',
        slug: 'housing-wires-flexibles',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop',
        points: ['FR / FRLS Building Wires', 'Multicore Flexible Cables', 'Submersible Pump Cables', 'Coaxial Cables']
    }
];

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('Connected to DB...');

        // Clear existing categories
        await Category.deleteMany({});
        console.log('Existing categories cleared.');

        // Insert new categories
        await Category.insertMany(categories);
        console.log('Static Categories Seeded Successfully!');
        
        process.exit();
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
};

seedCategories();
