const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ResourcesPage = require('./src/models/ResourcesPage');

dotenv.config();

const seedResources = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if data exists
        let settings = await ResourcesPage.findOne();

        const defaultData = {
            heroTitle: 'Resources',
            heroSubtitle: 'Access our resource library to arrive at an informed decision.',
            heroImage: '/assets/resources/headerbgIcon.png',
            heroMobileImage: '/assets/resources/headerbgIcon.png',
            featuredTool: {
                icon: '/assets/resources/calculator.png',
                title: 'Cable Selection Tool',
                description: 'Identify the right cable for your application based on voltage, current, installation conditions, and performance requirements.',
                buttonText: 'Launch Tool',
                buttonLink: '#',
                backgroundImage: '/assets/resources/img-1.jpg'
            },
            toolsList: [
                {
                    icon: '/assets/resources/rupeeIcon.png',
                    title: 'Pricing Calculator',
                    description: 'Generate indicative pricing based on cable specifications and project requirements.'
                },
                {
                    icon: '/assets/resources/openbookIcon.png',
                    title: 'Technical Blogs & Insights',
                    description: 'Access technical perspectives, application insights, and industry developments across cable systems and infrastructure.'
                }
            ],
            whitepapersTitle: 'Whitepapers & Research',
            whitepapersViewAllLink: '#',
            whitepapersList: [
                {
                    title: "Future of Cable Technology in Renewable Energy",
                    description: "Comprehensive analysis of cable requirements for solar and wind installations",
                    author: "Dr. Rajesh Kumar, CTO",
                    date: "March 2024",
                    downloadLink: "/assets/resources/whitepaper-1.pdf",
                    icon: "/assets/resources/Lightbulb.png",
                    downloadText: "Download"
                },
                {
                    title: "Smart Grid Integration: Challenges and Solutions",
                    description: "Technical insights on integrating advanced cables with smart grid infrastructure",
                    author: "Priya Sharma, Head of R&D",
                    date: "February 2024",
                    downloadLink: "/assets/resources/whitepaper-2.pdf",
                    icon: "/assets/resources/Lightbulb.png",
                    downloadText: "Download"
                },
                {
                    title: "Sustainability in Cable Manufacturing",
                    description: "Our approach to eco-friendly manufacturing and circular economy practices",
                    author: "Amit Patel, VP Operations",
                    date: "January 2024",
                    downloadLink: "/assets/resources/whitepaper-3.pdf",
                    icon: "/assets/resources/Lightbulb.png",
                    downloadText: "Download"
                }
            ],
            blogsTitle: 'Articles & Case studies',
            blogsSubtitle: 'Industry trends, technical articles, and expert opinions from our team',
            blogsCategories: ['All', 'Blogs', 'Events', 'Case studies'],
            blogsFeaturedTitle: 'Featured Articles',
            featuredBlogs: [
                {
                    isFeatured: true,
                    image: "/assets/resources/fallback4.png",
                    category: "Renewable Energy",
                    title: "The Future of Renewable Energy Cables",
                    description: "Exploring the latest innovations in cable technology for solar and wind energy installations, and how they're shaping the future of sustainable power distribution.",
                    author: "Dr. Rajesh Kumar",
                    date: "March 1, 2024",
                    readTime: "8 min read",
                    link: "#"
                },
                {
                    isFeatured: true,
                    image: "/assets/resources/fallbackImage.png",
                    category: "Technical Guide",
                    title: "Cable Installation Workshop for Industrial Applications",
                    description: "A comprehensive guide to proper cable installation techniques, safety protocols, and maintenance procedures for industrial environments.",
                    author: "Dr. Amit Sharma",
                    date: "February 27, 2024",
                    readTime: "12 min read",
                    link: "#"
                },
                {
                    isFeatured: false,
                    image: "/assets/resources/img5.png",
                    category: "Smart Infrastructure",
                    title: "Smart Cities and the Role of Advanced Cable Infrastructure",
                    description: "Understanding how modern cable technology enables smart city initiatives, from IoT networks to intelligent traffic management systems.",
                    readTime: "6 min read",
                    link: "#"
                },
                {
                    isFeatured: false,
                    image: "/assets/resources/fallback2.png",
                    category: "Manufacturing",
                    title: "Industry 4.0: Cables for Manufacturing Excellence",
                    description: "Discover the specialized cable requirements for robotic systems, automated assembly lines, and the future of smart manufacturing.",
                    readTime: "6 min read",
                    link: "#"
                },
                {
                    isFeatured: false,
                    image: "/assets/resources/fallback3.png",
                    category: "Electric Vehicles",
                    title: "EV Charging Infrastructure: Cable and Standards",
                    description: "Technical overview of cable specifications for electric vehicle stations, including safety standards and performance requirements.",
                    readTime: "6 min read",
                    link: "#"
                }
            ]
        };

        if (!settings) {
            settings = new ResourcesPage(defaultData);
            await settings.save();
            console.log('Created ResourcesPage document and seeded data.');
        } else {
            Object.assign(settings, defaultData);
            await settings.save();
            console.log('Updated ResourcesPage document and seeded data.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedResources();
