const AboutPage = require('../models/AboutPage');

// Get or initialize the single about page document
exports.get = async (req, res) => {
    try {
        let page = await AboutPage.findOne();
        if (!page) {
            // Auto-create default document if none exists
            page = await AboutPage.create({
                heroTitle: 'About Asian Cables',
                heroImage: '',
                heroStats: [
                    { value: '50+', label: 'Years of Excellence' },
                    { value: '10M+', label: 'Happy Customers' }
                ],
                builtOnLinks: [
                    { label: 'User Manual', url: '/user-manual', icon: 'file' },
                    { label: 'Pricing Calculator', url: '/pricing', icon: 'calculator' },
                    { label: 'Downloads', url: '/downloads', icon: 'download' }
                ],
                valueCards: [
                    { title: 'Our Vision', description: 'To reduce risk in irreversible system choices by engineering high-performance solutions that deliver quiet assurance and confident progress.', icon: '' },
                    { title: 'Our Mission', description: 'To be the force of certainty in every environment, empowering the systems that drive progress and the spaces that define human life.', icon: '' },
                    { title: 'Our Purpose', description: 'To enable safer, smarter, and more reliable environments through engineering solutions that connect industries, infrastructure, and everyday life.', icon: '' },
                    { title: 'Our Values', description: 'To lead with integrity, build with precision, and foster partnerships grounded in trust, accountability, and long-term progress.', icon: '' }
                ],
                journeyTitle: 'Our Journey',
                journeyCards: [
                    { year: '2010', description: 'Merger of RPC Cables Ltd. into KEC International Ltd', image: '' },
                    { year: '2012', description: 'Expanded operations to international markets', image: '' }
                ],
                governanceTitle: 'Shaped By Governance. Built On Quality. Proven Across Critical Applications.',
                governancePrimaryTitle: 'RPG Governance & Institutional Credibility',
                governancePrimaryDescription: 'Asian Cables operates under the governance framework of the RPG Group, one of India\'s most respected business groups, known for its professional management, ethical standards, and long-term value creation. Our legacy of trust is built on a foundation of transparency, accountability, and institutional credibility.',
                governancePrimaryIcon: '',
                governanceCards: [
                    { title: 'Consistent Quality & Accredited Testing', icon: '' },
                    { title: 'Proven Track Record in Critical Projects', icon: '' },
                    { title: 'Custom Engineering & Application-Specific Solutions', icon: '' }
                ],
                leadershipTitle: 'Leadership Team',
                leadershipSubtitle: 'Meet the visionaries driving Asian Cables forward',
                leadershipButtonLabel: 'View Leadership',
                leadershipButtonUrl: '#',
                leadershipMembers: [
                    { name: 'John Doe', designation: 'CEO', image: '' },
                    { name: 'Jane Smith', designation: 'CTO', image: '' }
                ]
            });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update the about page document
exports.update = async (req, res) => {
    try {
        let page = await AboutPage.findOne();
        if (!page) {
            page = await AboutPage.create(req.body);
        } else {
            page = await AboutPage.findByIdAndUpdate(
                page._id,
                req.body,
                { new: true, runValidators: true }
            );
        }
        res.status(200).json({ success: true, data: page, message: 'About page settings saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
