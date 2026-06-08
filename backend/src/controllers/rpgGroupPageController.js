const RpgGroupPage = require('../models/RpgGroupPage');

exports.get = async (req, res) => {
    try {
        let page = await RpgGroupPage.findOne();
        if (!page) {
            page = await RpgGroupPage.create({
                heroTitle: 'RPG GROUP\nPowered by Passion. Driven\nby Ethics.',
                heroDescription: "For nearly four decades, Asian Cables has been at the forefront of cable manufacturing excellence",
                heroImage: '',
                heroMobileImage: '',
                globalTitle: 'Global Presence',
                globalDescription: 'Operating across 135+ countries with world-class manufacturing and distribution facilities',
                globalImage: '',
                globalMainStats: [
                    { value: '35K+', label: 'Employees' },
                    { value: '135+', label: 'Countries' }
                ],
                globalCards: [
                    { value: '1979', label: 'Founded' },
                    { value: 'USD 5.2 billion', label: 'Group Turnover' }
                ],
                infoHeading: "A 5.2Bn Group with Businesses from major sectors of the economy.",
                infoDescriptions: [
                    "The RPG Group is one of India's leading diversified business conglomerates, built on a foundation of ethical leadership, professional governance, and long-term value creation. With a strong presence across infrastructure, engineering, technology, pharmaceuticals, and consumer businesses, the Group operates at the intersection of scale, capability, and responsibility.",
                    "Founded by Shri R. P. Goenka in 1979, RPG has evolved into a globally respected enterprise with a multi-sector portfolio and international footprint. The RPG Group brings together diverse businesses, united by ethics, professional governance, and long-term value creation."
                ],
                infoButtonText: 'Visit RPG Website',
                infoButtonUrl: 'https://rpggroup.com',
                infoImage: '',
                ecosystemTitle: 'RPG Group Ecosystem',
                ecosystemCards: [
                    { title: 'Information Technology', image: '', url: '#' },
                    { title: 'Infrastructure', image: '', url: '#' },
                    { title: 'Tyres', image: '', url: '#' }
                ],
                coreValuesTitle: 'Core Values',
                coreValuesCards: [
                    { title: 'ETHICS', desc: 'To be ethical, sincere and open in all our transactions.', icon: '' },
                    { title: 'RESPECT', desc: 'To show respect and inspire trust.', icon: '' }
                ],
                verticalsTitle: 'Business Verticals',
                verticalsDescription: 'A diverse portfolio spanning key sectors of the global economy.',
                verticalsCards: [
                    { title: 'IT Services', image: '' },
                    { title: 'Infrastructure', image: '' }
                ],
                faqTitle: 'Frequently Asked Questions',
                faqs: [
                    { question: 'What sectors does RPG Group operate in?', answer: 'IT, Infrastructure, Tyres, Pharmaceuticals, Energy, and more.' }
                ]
            });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        let page = await RpgGroupPage.findOne();
        if (!page) {
            page = new RpgGroupPage();
        }

        // Update fields dynamically
        const fields = [
            'heroTitle', 'heroDescription', 'heroImage', 'heroMobileImage',
            'globalTitle', 'globalDescription', 'globalImage', 'globalMainStats', 'globalCards',
            'infoHeading', 'infoDescriptions', 'infoButtonText', 'infoButtonUrl', 'infoImage',
            'ecosystemTitle', 'ecosystemCards', 'coreValuesTitle', 'coreValuesCards',
            'verticalsTitle', 'verticalsDescription', 'verticalsCards', 'faqTitle', 'faqs'
        ];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                page[field] = req.body[field];
            }
        });

        await page.save();
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
