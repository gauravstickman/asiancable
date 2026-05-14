const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        res.json({
            token: generateToken(admin._id),
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        if (admin) {
            res.status(201).json({
                token: generateToken(admin._id),
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email
                },
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
