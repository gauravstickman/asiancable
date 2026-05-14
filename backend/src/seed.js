const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const adminExists = await Admin.findOne({ email: 'admin@example.com' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await Admin.create({
            name: 'Super Admin',
            email: 'admin@example.com',
            password: hashedPassword
        });

        console.log('Default Admin Created Successfully!');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');
        
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
