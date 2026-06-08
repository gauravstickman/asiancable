const LifeAtAsianCablesPage = require('../models/LifeAtAsianCablesPage');

const getSettings = async (req, res) => {
    try {
        let settings = await LifeAtAsianCablesPage.findOne();
        
        if (!settings) {
            settings = await LifeAtAsianCablesPage.create({});
        }

        res.json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Error in getLifeAtAsianCablesSettings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Life at Asian Cables page settings',
            error: error.message
        });
    }
};

const updateSettings = async (req, res) => {
    try {
        let settings = await LifeAtAsianCablesPage.findOne();
        
        if (!settings) {
            settings = new LifeAtAsianCablesPage();
        }

        // Update fields
        Object.keys(req.body).forEach(key => {
            settings[key] = req.body[key];
        });

        await settings.save();

        res.json({
            success: true,
            message: 'Life at Asian Cables page settings updated successfully',
            data: settings
        });
    } catch (error) {
        console.error('Error in updateLifeAtAsianCablesSettings:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating Life at Asian Cables page settings',
            error: error.message
        });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
