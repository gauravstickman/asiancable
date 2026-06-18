const ResourcesPage = require('../models/ResourcesPage');

const getSettings = async (req, res) => {
    try {
        let page = await ResourcesPage.findOne();
        if (!page) {
            page = await ResourcesPage.create({
                heroTitle: 'Resources',
                heroSubtitle: 'Access our resource library to arrive at an informed decision.',
                heroImage: '',
                heroMobileImage: '',
                featuredTool: {
                    icon: '', title: 'Cable Selection Tool', description: 'Identify the right cable for your application...', buttonText: 'Launch Tool', buttonLink: '#', backgroundImage: ''
                },
                toolsList: [
                    { icon: '', title: 'Pricing Calculator', description: 'Generate indicative pricing...' }
                ],
                whitepapersTitle: 'Whitepapers & Research',
                whitepapersViewAllLink: '#',
                whitepapersList: [
                    { icon: '', title: 'Future of Cable Technology in Renewable Energy', author: 'Dr. Rajesh Kumar, CTO', date: 'March 2024', description: 'Comprehensive analysis...', downloadLink: '#', downloadText: 'Download' }
                ],
                blogsTitle: 'Technical Blogs & Insights',
                blogsSubtitle: 'Industry trends, technical articles, and expert opinions from our team (150+ Articles)',
                blogsCategories: ['All Articles', 'Renewable Energy', 'Technical Guide'],
                blogsFeaturedTitle: 'Featured Articles',
                featuredBlogs: [
                    { isFeatured: true, image: '', category: 'Renewable Energy', readTime: '8 min read', title: 'The Future of Renewable Energy Cables', description: 'Exploring the latest innovations in cable technology for solar and wind energy installations...', author: 'Dr. Rajesh Kumar', date: 'March 1, 2024', link: '#' }
                ]
            });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        console.error('Error fetching resources page settings:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const updateSettings = async (req, res) => {
    try {
        let page = await ResourcesPage.findOne();
        if (!page) {
            page = new ResourcesPage(req.body);
            await page.save();
        } else {
            page = await ResourcesPage.findOneAndUpdate({}, req.body, { returnDocument: 'after', runValidators: true });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        console.error('Error updating resources page settings:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
