const SustainabilityPage = require('../models/SustainabilityPage');

exports.get = async (req, res) => {
    try {
        let page = await SustainabilityPage.findOne();
        if (!page) {
            page = await SustainabilityPage.create({
                heroTitle: 'Sustainability',
                heroImage: '',
                heroMobileImage: '',
                stats: [
                    { value: '100%', label: 'Renewable Energy' }
                ],
                ourSustainabilityTitle: 'Our Sustainability',
                ourSustainabilityDescription: 'We are committed to making a positive impact on the environment...',
                ourSustainabilityImage: '',
                commitmentsTitle: '',
                commitments: [
                    { icon: '', text: 'Committed to sustainable operations' },
                    { icon: '', text: 'Advancing the green economy and reducing our ecological footprint' },
                    { icon: '', text: 'Preserving and enhancing natural capital' },
                    { icon: '', text: 'Comprehensive environmental stewardship' },
                    { icon: '', text: 'Healthier planet & a sustainable future' }
                ],
                certificationsTitle: 'Certifications & Accreditations',
                certifications: [
                    { image: '', title: 'IGBC', description: 'Platinum-certified green factory (Vadodara)' },
                    { image: '', title: 'ISO 14001', description: 'Environmental Management System' }
                ],
                highlightsTitle: 'Sustainability Highlights',
                highlights: [
                    { image: '', title: 'IGBC Platinum Certified Green Factory', description: 'Our Vadodara manufacturing facility has been awarded...' }
                ]
            });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        console.error('Error fetching sustainability page:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.update = async (req, res) => {
    try {
        let page = await SustainabilityPage.findOne();
        if (!page) {
            page = new SustainabilityPage(req.body);
            await page.save();
        } else {
            page = await SustainabilityPage.findOneAndUpdate({}, req.body, { returnDocument: 'after', runValidators: true });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        console.error('Error updating sustainability page:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
