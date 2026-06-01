const HomepageSettings = require('../models/HomepageSettings');

// Default initial data exactly as it was seeded in separate components
const initialData = {
    heroSlides: [
        { title: "Transforming", subtitle: "Energy Infrastructure", cta: { text: "INDUSTRIES", link: "/industries" }, image: "/src/assets/hero1.png" },
        { title: "Powering", subtitle: "A Sustainable Future", cta: { text: "ABOUT US", link: "/about" }, image: "/src/assets/hero2.png" },
        { title: "Connecting", subtitle: "The World", cta: { text: "PRODUCTS", link: "/products" }, image: "/src/assets/hero3.png" }
    ],
    aboutUs: {
        description: "We are more than just a cable manufacturer. We are architects of connection, powering the infrastructure that drives tomorrow's innovations. With decades of excellence, our commitment to quality, sustainability, and technological advancement has made us the trusted partner for monumental projects worldwide."
    },
    testimonials: [
        { name: "John Doe", position: "Chief Engineer", company: "Global Infrastructure Ltd.", quote: "Asian Cables provided unmatched quality and reliability for our project.", image: "/src/assets/t1.png", rating: 5 },
        { name: "Sarah Jenkins", position: "Project Manager", company: "NextGen Power Systems", quote: "The durability of their cables in extreme conditions is simply incredible.", image: "/src/assets/t2.png", rating: 5 },
        { name: "Michael Chen", position: "Director of Operations", company: "TechGrid Solutions", quote: "Outstanding service and top-tier product quality. Highly recommended.", image: "/src/assets/t3.png", rating: 4 }
    ],
    facts: {
        presence: {
            title: "Global Presence",
            description: "Supplying high-quality cables to over 40 countries across 5 continents, Asian Cables is a globally recognized brand trusted by major infrastructure projects worldwide.",
            image: "/src/assets/about-image.png"
        },
        decades: {
            title: "5",
            subtitle: "Decades",
            description: "Of industry leadership and innovation"
        },
        capacity: {
            title: "20,000",
            subtitle: "MT Capacity",
            description: "Annual production capacity"
        },
        annual: {
            value: "2.5M+",
            title: "Annual Revenue",
            description: "Driving economic growth through infrastructure",
            image: "/src/assets/about-image.png"
        }
    },
    applications: {
        main: {
            title: "Oil & Gas",
            description: "Enabling uninterrupted operations across upstream, midstream, and downstream facilities through cabling solutions aligned to safety protocols, reliability requirements, and asset integrity expectations.",
            image: "/src/assets/hero1.png"
        },
        small1: { title: "Power Plants", image: "/src/assets/hero2.png" },
        small2: { title: "Utilities", image: "/src/assets/hero3.png" },
        wide: { title: "Industrial & Heavy Engineering", image: "/src/assets/hero4.png" }
    },
    provenFields: [
        { tag: "Renewable Energy", title: "Solar Power Plants", description: "Providing highly durable DC solar cables for large-scale solar parks.", image: "/src/assets/p1.png", badges: ["High UV Resistance", "TUV Certified", "Long Lifespan"] },
        { tag: "Infrastructure", title: "Metro Rail Networks", description: "Supplying fire survival and low smoke zero halogen cables for underground transit systems.", image: "/src/assets/p2.png", badges: ["Fire Survival", "LSZH", "High Safety Standard"] }
    ],
    engineering: {
        tagline: "Engineering Excellence",
        title: "Cutting-Edge Manufacturing",
        description: "Our state-of-the-art facilities utilize the latest technologies to produce cables that meet and exceed international standards.",
        items: [
            { title: "Material Science", description: "Advanced polymer research for superior insulation.", icon: "flask", hoverColor: "blue", link: "/innovation" },
            { title: "Precision Extrusion", description: "Micro-millimeter accuracy in cable construction.", icon: "settings", hoverColor: "green", link: "/manufacturing" }
        ]
    },
    homepageBlogs: {
        title: "Latest Insights & News",
        subtitle: "Stay updated with the latest trends, innovations, and news from the cable manufacturing industry.",
        blogs: [
            { title: "The Future of Smart Grid Cables", date: "Oct 15, 2023", category: "Innovation", readTime: "5 min read", image: "/src/assets/b1.png", link: "/blog/smart-grid" },
            { title: "Sustainability in Manufacturing", date: "Nov 02, 2023", category: "Environment", readTime: "4 min read", image: "/src/assets/b2.png", link: "/blog/sustainability" }
        ]
    },
    productRange: [
        {
            title: "Specialty Cables",
            image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1400&auto=format&fit=crop",
            points: [
                "Fire-Survival & LSZH",
                "Solar & EV Charging Ready",
                "Oil & Gas Rated"
            ],
            link: "/products"
        },
        {
            title: "Power Cables",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
            points: [
                "Up to 220 kV",
                "Single & Multicore",
                "Factory-Tested"
            ],
            link: "/products"
        },
        {
            title: "Railway Cables",
            image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200&auto=format&fit=crop",
            points: [
                "Contact & Catenary Wires",
                "Signaling & Quad Cables",
                "Fire-Survival for Tunnels"
            ],
            link: "/products"
        },
        {
            title: "Control & Instrumentation",
            image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
            points: [
                "Screened & Armoured",
                "FR / FRLS / LSZH",
                "Up to 61+ Cores"
            ],
            link: "/products"
        },
        {
            title: "Conductors",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
            points: [
                "AAC, AAAC, ACSR, Al 59",
                "Overhead Transmission",
                "High-Temperature Rated"
            ],
            link: "/products"
        },
        {
            title: "Telecom & OFC",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
            points: [
                "Single & Multi-Mode Fibre",
                "Up to 288+ Fibre Counts",
                "ADSS & Armoured Options"
            ],
            link: "/products"
        }
    ],
    sustainability: {
        bgImage: "/assets/sustainability-bg.jpg",
        heading: "We transform lives by building sustainable world-class infrastructure.",
        primaryBtnText: "Our Sustainability Practices",
        primaryBtnLink: "/sustainability",
        secondaryBtnText: "View Certifications",
        secondaryBtnLink: "/certifications",
        features: [
            {
                title: "Environment",
                description: "IGBC Platinum-certified green factory",
                icon: "/assets/sus1.png"
            },
            {
                title: "Safety",
                description: "ISO 45001 occupational health & safety certified",
                icon: "/assets/sus2.png"
            },
            {
                title: "Responsible Manufacturing",
                description: "Waste reduction through optimised production",
                icon: "/assets/sus3.png"
            }
        ]
    },
    latestBlogs: [
        {
            tag: "Event",
            title: "Conferences & Summits",
            description: "Providing robust cabling infrastructure for major international summits and high-security venues.",
            image: "/assets/Picture18.png",
            link: "/blogs"
        },
        {
            tag: "Blog",
            title: "Festivals & Live Experiences",
            description: "Best for creative and large public events with high traffic and multi-location challenges.",
            image: "/assets/Picture16.png",
            link: "/blogs"
        },
        {
            tag: "Event",
            title: "Trade Shows & Exhibitions",
            description: "Reliable and flexible power solutions designed for transient displays, booths, and expo pavilions.",
            image: "/assets/Picture22.png",
            link: "/blogs"
        }
    ]
};

exports.getSettings = async (req, res) => {
    try {
        let settings = await HomepageSettings.findOne();
        if (!settings) {
            settings = await HomepageSettings.create(initialData);
        } else {
            let needsSave = false;
            if (!settings.productRange || settings.productRange.length === 0) {
                settings.productRange = initialData.productRange;
                needsSave = true;
            }
            if (!settings.sustainability || !settings.sustainability.heading || !settings.sustainability.features || settings.sustainability.features.length === 0) {
                settings.sustainability = initialData.sustainability;
                needsSave = true;
            }
            if (!settings.latestBlogs || settings.latestBlogs.length === 0) {
                settings.latestBlogs = initialData.latestBlogs;
                needsSave = true;
            }
            if (needsSave) {
                await settings.save();
            }
        }
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        let settings = await HomepageSettings.findOne();
        if (!settings) {
            settings = new HomepageSettings(req.body);
            await settings.save();
        } else {
            settings = await HomepageSettings.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
        }
        res.status(200).json({ success: true, data: settings, message: "Homepage Settings updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
