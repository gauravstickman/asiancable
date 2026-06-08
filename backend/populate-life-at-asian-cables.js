require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const LifeAtAsianCablesPage = require('./src/models/LifeAtAsianCablesPage');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin').then(async () => {
    const data = {
        headerBgImage: '/assets/Lifeofasiancables/ImageWithFallback.png',
        headerMobileBgImage: '',
        headerTag: 'Culture',
        headerTitle: 'Your Connection to Brighter Future',
        headerDescription: "At Asian Cables, part of RPG Group, we don't just manufacture wires and cables — we power industries, enable homes, and connect communities. Be part of a team that builds with purpose and grows with pride.",
        
        whyWorkImage: '/assets/Lifeofasiancables/whywork.png',
        whyWorkTitle: 'Why Work at Asian Cables',
        whyWorkDescription1: 'Founded in 1959, Asian Cables has been a pioneer in delivering quality wires and cables across India and abroad. We are part of RPG Group, a USD 5.2 billion global conglomerate. We empower every employee to unlock their potential and play a role in touching lives through our safe, energy-efficient products.',
        whyWorkDescription2: "When you join Asian Cables, you don't just build a career — you help power progress.",
        
        cultureTitle: 'Our Culture & Core Values',
        cultureDescription: 'Our culture is anchored in the core values of the RPG Group, which inspires us to act with integrity and pursue excellence. We nurture an inclusive, entrepreneurial, and people-first culture where every individual is valued and empowered to make a difference.',
        cultureValues: [
            {
                title: "Nurturing Talent",
                icon: "/assets/Lifeofasiancables/carasel1.png",
                description: "• Opportunities to learn, grow, and lead\n• Exposure to diverse projects and cross-functional collaboration\n• Recognition that rewards initiative, innovation, and ownership"
            },
            {
                title: "Touching Lives",
                icon: "/assets/Lifeofasiancables/carasel3.png",
                description: "• Meaningful work that powers progress in homes and industries\n• A supportive environment where personal and professional well-being matter"
            },
            {
                title: "Outperforming Together",
                icon: "/assets/Lifeofasiancables/carasel2.png",
                description: "• Clear goals, transparent feedback, and recognition for excellence\n• Collaborative teams that celebrate shared success\n• Continuous improvement as a way of life"
            },
            {
                title: "Happiness",
                icon: "/assets/Lifeofasiancables/carasel4.png",
                description: "• A workplace where people enjoy what you do\n• Celebrations, camaraderie, and a sense of belonging\n• Work-life balance that respects individual needs"
            }
        ],
        
        experienceImage: '/assets/Lifeofasiancables/experience1.png',
        experienceTitle: "What You'll Experience",
        experienceDescription: "We invest in our people through structured learning programmes, skill-building workshops, and leadership development initiatives.",
        experiencePoints: [
            {
                title: "Career Growth & Learning",
                image: "/assets/Lifeofasiancables/experience1.png",
                heading: "Room to grow, every step of the way",
                description: "We invest in our people through structured learning programmes, skill-building workshops, and leadership development initiatives. Whether you're a fresh graduate or a seasoned professional, there's always room to grow at Asian Cables.",
                cards: [
                    {
                        image: "BookOpen",
                        title: "Functional, technical, and behavioural training",
                        description: "Workshops across manufacturing, engineering, quality, and business functions."
                    },
                    {
                        image: "UserStar",
                        title: "Leadership & Mentorship Programmes",
                        description: "Structured leadership tracks and one-on-one mentorship programmes."
                    },
                    {
                        image: "MapPin",
                        title: "Move Across Roles & Locations",
                        description: "Opportunities to expand horizons across functions and geographies."
                    }
                ]
            },
            {
                title: "Benefits & Well-being",
                image: "/assets/Lifeofasiancables/experience2.png",
                heading: "Taking care of you — and your family.",
                description: "A holistic benefits programme designed around health, financial security, work-life balance, and community — because people do their best work when they feel supported.",
                cards: [
                    {
                        image: "HeartPulse",
                        title: "Comprehensive Health & Insurance",
                        description: "Medical coverage, annual check-ups, life and accident insurance for you and your family."
                    },
                    {
                        image: "Medal",
                        title: "Competitive Compensation & Rewards",
                        description: "Market-linked salary, annual bonuses, and a recognition programme including performance awards and spot recognitions."
                    },
                    {
                        image: "BriefcaseBusiness",
                        title: "Work-Life Balance",
                        description: "Generous leave — vacation, sick, parental — flexible work options, and wellness programmes including EAP and fitness classes."
                    },
                    {
                        image: "ShieldCheck",
                        title: "Financial Security",
                        description: "Provident Fund, gratuity, retirement benefits (NPS / Pension), and employee loan facilities."
                    },
                    {
                        image: "Users",
                        title: "Community & Fun",
                        description: "Team events, sports tournaments, and festival celebrations — we make sure you enjoy the journey."
                    }
                ]
            },
            {
                title: "Diversity & Inclusion",
                image: "/assets/Lifeofasiancables/experience3.jpg",
                heading: "Everyone belongs here.",
                description: "At Asian Cables, everyone belongs. We welcome colleagues of all backgrounds, genders, and experiences.",
                cards: [
                    {
                        image: "BookOpen",
                        title: "Every Voice Is Respected",
                        description: "We echo RPG's founding value of a happy, equitable workplace where every voice is heard."
                    },
                    {
                        image: "UserStar",
                        title: "Returners, Graduates & Veterans",
                        description: "Whether you are returning from a career break, a fresh graduate, or an experienced professional, you will find support and opportunity here."
                    },
                    {
                        image: "MapPin",
                        title: "Zero Tolerance for Discrimination",
                        description: "A firm, uncompromising commitment to a workplace free from discrimination of any kind."
                    }
                ]
            }
        ],
        
        testimonialsTitle: 'Hear From Our People',
        testimonials: [
            {
                name: "Poonam Rankawat",
                role: "Manager – Design",
                image: "",
                quote: "My journey at KEC Asian Cables has been defined by continuous learning, meaningful opportunities, and a strong sense of purpose. Culture is the soul of any organisation - it reflects its beliefs and values, and more importantly, how they are lived every day."
            },
            {
                name: "Sitendra Pandey",
                role: "Manager – Business Excellence",
                image: "",
                quote: "My time at Asian Cables has been both rewarding and impactful. The organisation's emphasis on discipline, performance, and continuous improvement creates an environment where consistent results and long-term value are prioritised."
            },
            {
                name: "Amit Barasara",
                role: "Manager – Quality",
                image: "",
                quote: "Every day at KEC Asian Cables, I feel a sense of purpose and pride in what I do. I have been trusted with meaningful responsibilities and given room to grow professionally. The 5-Day Work Week Initiative has been a game-changer for my personal well-being."
            }
        ],
        
        dayInLifeTitle: 'A Day in the Life',
        dayInLifeDescription: 'Experience the energy of our shop floors, the collaboration in our offices, and the passion that drives every Asian Cables team member.',
        dayInLifeVideo: '',
        dayInLifeImage: '/assets/Lifeofasiancables/Image2.png',
        
        lifeBeyondTitle: 'Life Beyond Work',
        lifeBeyondDescription: 'We believe in celebrating our successes, giving back to the community, and ensuring our employees enjoy a healthy work-life balance.',
        lifeBeyondImages: [
            "/assets/Lifeofasiancables/Image.png",
            "/assets/Lifeofasiancables/Image2.png"
        ],
        
        openRolesTitle: 'Ready to Power Progress?',
        openRolesDescription: 'Explore our open roles and discover where your skills can take you.',
        openRolesLink: '/careers'
    };

    let page = await LifeAtAsianCablesPage.findOne();
    if (!page) {
        page = new LifeAtAsianCablesPage(data);
    } else {
        Object.assign(page, data);
    }
    
    await page.save();
    console.log("Successfully updated Life at Asian Cables in DB");
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
