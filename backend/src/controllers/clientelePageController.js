const ClientelePage = require('../models/ClientelePage');

// Get Clientele Page Settings
exports.getClientelePageSettings = async (req, res) => {
    try {
        // Fix bad data at the MongoDB native driver level if validation fails
        const rawDoc = await ClientelePage.collection.findOne({});
        if (rawDoc) {
            let needsRawUpdate = false;
            let updateFields = {};

            if (rawDoc.regions && rawDoc.regions.length > 0 && typeof rawDoc.regions[0] === 'string') {
                updateFields.regions = rawDoc.regions.map(r => ({ name: r, icon: '' }));
                needsRawUpdate = true;
            }

            if ((!rawDoc.heroStats || rawDoc.heroStats.length === 0) && (rawDoc.stat1Number || rawDoc.stat2Number || rawDoc.stat3Number)) {
                updateFields.heroStats = [
                    { value: rawDoc.stat1Number || '', label: rawDoc.stat1Label || '' },
                    { value: rawDoc.stat2Number || '', label: rawDoc.stat2Label || '' },
                    { value: rawDoc.stat3Number || '', label: rawDoc.stat3Label || '' }
                ];
                needsRawUpdate = true;
            }

            if (needsRawUpdate) {
                await ClientelePage.collection.updateOne({ _id: rawDoc._id }, { $set: updateFields });
            }
        }

        let settings = await ClientelePage.findOne();
        
        // If no settings exist, create default
        if (!settings) {
            settings = await ClientelePage.create({
                heroStats: [
                    { value: '2500+', label: 'Employees' },
                    { value: '15+', label: 'Locations' },
                    { value: '50+', label: 'Open Positions' }
                ],
                regions: [
                    { name: 'International', icon: '' },
                    { name: 'Domestic', icon: '' }
                ],
                industries: ['All Industries', 'Power & Energy', 'Telecom', 'Infrastructure', 'Railway']
            });
        }
        
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Error in getClientelePageSettings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching clientele settings',
            error: error.message
        });
    }
};

// Update Clientele Page Settings
exports.updateClientelePageSettings = async (req, res) => {
    try {
        let settings = await ClientelePage.findOne();
        
        if (!settings) {
            settings = new ClientelePage(req.body);
        } else {
            Object.assign(settings, req.body);
        }
        
        await settings.save();
        
        res.status(200).json({
            success: true,
            message: 'Clientele settings updated successfully',
            data: settings
        });
    } catch (error) {
        console.error('Error in updateClientelePageSettings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating clientele settings',
            error: error.message
        });
    }
};
