const IndustryPage = require('../models/IndustryPage');

exports.getAll = async (req, res) => {
    try {
        const pages = await IndustryPage.find().select('name slug headerTitle');
        res.status(200).json({ success: true, data: pages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const page = await IndustryPage.findById(req.params.id);
        if (!page) {
            return res.status(404).json({ success: false, message: 'Industry Page not found' });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateById = async (req, res) => {
    try {
        const page = await IndustryPage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!page) {
            return res.status(404).json({ success: false, message: 'Industry Page not found' });
        }
        res.status(200).json({ success: true, data: page, message: "Settings updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
