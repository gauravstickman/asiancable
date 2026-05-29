const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });
const Admin = require('./src/models/Admin');

const updatePassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB at:", process.env.MONGO_URI);

        const admin = await Admin.findOne(); // gets the first admin
        if (!admin) {
            console.log("No admin user found in database!");
            process.exit(1);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("Admin@123", salt);

        admin.password = hashedPassword;
        await admin.save();

        console.log(`Password for ${admin.email} has been successfully updated to Admin@123 on LIVE DB`);
        process.exit(0);
    } catch (err) {
        console.error("Error updating password:", err);
        process.exit(1);
    }
};

updatePassword();
