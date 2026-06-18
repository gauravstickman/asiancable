const ContactPage = require('../models/ContactPage');

// Get Contact Page settings
exports.getContactPageSettings = async (req, res) => {
    try {
        let settings = await ContactPage.findOne();
        
        if (!settings) {
            settings = await ContactPage.create({});
        }
        
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Error fetching contact page settings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact page settings'
        });
    }
};

// Update Contact Page settings
exports.updateContactPageSettings = async (req, res) => {
    try {
        let settings = await ContactPage.findOne();
        
        if (settings) {
            settings = await ContactPage.findByIdAndUpdate(
                settings._id,
                req.body,
                { returnDocument: 'after', runValidators: true }
            );
        } else {
            settings = await ContactPage.create(req.body);
        }
        
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Error updating contact page settings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update contact page settings'
        });
    }
};
