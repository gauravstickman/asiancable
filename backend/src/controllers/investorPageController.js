const InvestorPage = require('../models/InvestorPage');

// Get or initialize the single investor page document
exports.get = async (req, res) => {
    try {
        let page = await InvestorPage.findOne();
        if (!page) {
            // Auto-create default document if none exists
            page = await InvestorPage.create({
                heroTitle: 'Building Value Together',
                heroDescription: 'Transparent governance, strong financial performance, and sustainable growth driving shareholder value.',
                heroDesktopImage: '',
                heroMobileImage: ''
            });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update the investor page document
exports.update = async (req, res) => {
    try {
        let page = await InvestorPage.findOne();
        if (!page) {
            page = await InvestorPage.create(req.body);
        } else {
            page = await InvestorPage.findByIdAndUpdate(
                page._id,
                req.body,
                { returnDocument: 'after', runValidators: true }
            );
        }
        res.status(200).json({ success: true, data: page, message: 'Investor page settings saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
