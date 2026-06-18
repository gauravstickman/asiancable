const LeadershipPage = require('../models/LeadershipPage');

exports.get = async (req, res) => {
    try {
        let page = await LeadershipPage.findOne();
        if (!page) {
            page = await LeadershipPage.create({
                heroTitle: 'Leadership',
                heroDescription: '',
                heroImage: '',
                heroMobileImage: '',
                globalTitle: 'Global',
                globalDescription: 'Operating across 135+ countries with world-class manufacturing and service facilities',
                globalImage: '',
                globalMainStats: [
                    { value: '35K+', label: 'Employees' },
                    { value: '135+', label: 'Countries' }
                ],
                globalCards: [
                    { value: '1979', label: 'Founded' },
                    { value: 'USD 5.2 billion', label: 'Group Turnover' },
                    { value: 'DR. R P Goenka', label: 'Founder' }
                ],
                groupTitle: 'A 5.2Bn Group with Businesses from major sectors of the economy.',
                groupImage: '',
                groupDescription: 'The RPG Group is one of India\'s leading diversified business conglomerates, built on a foundation of ethical leadership, professional governance, and long-term value creation.',
                groupLinkUrl: '#',
                ecosystemTitle: 'The RPG Group Ecosystem',
                ecosystemSubtitle: 'A diversified conglomerate with leading brands across multiple industries',
                ecosystemCards: [
                    {
                        logo: '',
                        description: 'A leading cable manufacturing company delivering high-performance power, telecom, and industrial cable solutions across diverse sectors.'
                    }
                ],
                valuesTitle: 'Core Values',
                valuesCards: [
                    {
                        icon: '',
                        title: 'UNLEASH TALENT',
                        description: 'Enabling an environment for people to unleash their entrepreneurial spirit and realise their full potential.'
                    },
                    {
                        icon: '',
                        title: 'TOUCH LIVES',
                        description: 'To understand, care and make a meaningful difference to customers, employees, society and all stakeholders.'
                    }
                ],
                verticalsTitle: 'Business Verticals',
                verticalsCards: [
                    {
                        icon: '',
                        title: 'Infrastructure & Engineering'
                    },
                    {
                        icon: '',
                        title: 'Information Technology (IT Services)'
                    },
                    {
                        icon: '',
                        title: 'Energy & Industrial Solutions'
                    }
                ],
                faqTitle: 'Frequently Asked Questions',
                faqs: [
                    {
                        question: 'What are the main business verticals of the RPG Group?',
                        answer: 'The RPG Group operates across Infrastructure & Engineering, Information Technology (IT Services), and Energy & Industrial Solutions.'
                    },
                    {
                        question: 'Where is the RPG Group headquartered?',
                        answer: 'The RPG Group is headquartered in Mumbai, India, but operates globally across 135+ countries.'
                    }
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
        let page = await LeadershipPage.findOne();
        if (!page) {
            page = await LeadershipPage.create(req.body);
        } else {
            page = await LeadershipPage.findByIdAndUpdate(
                page._id,
                req.body,
                { returnDocument: 'after', runValidators: true }
            );
        }
        res.status(200).json({ success: true, data: page, message: 'Leadership page settings saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
