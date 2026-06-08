require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const SustainabilityPage = require('./src/models/SustainabilityPage');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin').then(async () => {
    const data = {
        heroTitle: "Powering Infrastructure\nResponsibly",
        heroImage: "/assets/sustainability/bgIcon.png",
        heroMobileImage: "/assets/sustainability/bgIcon.png",
        stats: [
            { value: "IGBC", label: "Platinum Certified Green Factory" },
            { value: "96%", label: "Mysuru plant running on renewable energy" },
            { value: "70%", label: "Vadodara plant running on renewable energy" },
            { value: "100%", label: "Recycling of water in both plants." }
        ],
        ourSustainabilityTitle: "Our Sustainability\nOutlook",
        ourSustainabilityDescription: "At Asian Cables, sustainability is an integral part of our manufacturing philosophy and business operations. Our facilities and processes are designed to deliver high-performance cable solutions while minimizing environmental impact and ensuring responsible resource management. As encapsulated in our sustainability purpose, “We transform lives by building sustainable world-class infrastructure.”",
        ourSustainabilityImage: "/assets/sustainability/img-5.png",
        commitmentsTitle: "Our Commitments",
        commitments: [
            { text: "Committed to sustainable operations", icon: "" },
            { text: "Advancing the green economy and reducing our ecological footprint", icon: "" },
            { text: "Preserving and enhancing natural capital", icon: "" },
            { text: "Comprehensive environmental stewardship", icon: "" },
            { text: "Healthier planet & a sustainable future", icon: "" }
        ],
        certificationsTitle: "Certifications & Accreditations",
        certifications: [
            { image: "/assets/sustainability/img-1.png", title: "IGBC", description: "Platinum-certified green factory (Vadodara)" },
            { image: "/assets/sustainability/img-2.png", title: "ISO 14001", description: "Environmental Management Systems" },
            { image: "/assets/sustainability/img-3.png", title: "ISO 9001", description: "Quality Management Systems" },
            { image: "/assets/sustainability/img-4.png", title: "ISO 45001", description: "Occupational Health & Safety" }
        ],
        highlightsTitle: "Sustainability Highlights",
        highlights: [
            { image: "/assets/sustainability/img-6.png", title: "IGBC Platinum Certified Green Factory", description: "Our Vadodara manufacturing facility has been awarded Platinum Certification by the Indian Green Building Council (IGBC), reflecting our commitment to environmentally responsible industrial infrastructure and sustainable manufacturing practices." },
            { image: "/assets/sustainability/img-7.png", title: "Environmentally Responsible Manufacturing", description: "We follow sustainable manufacturing practices to minimise environmental impact and conserve resources." },
            { image: "/assets/sustainability/img-7.png", title: "Circular Materials & Energy Efficiency", description: "Investing in energy efficiency and circular material flows across our operations." },
            { image: "/assets/sustainability/img-6.png", title: "Sustainable Infrastructure", description: "Building sustainable world-class infrastructure through responsible manufacturing." }
        ]
    };

    let page = await SustainabilityPage.findOne();
    if (!page) {
        page = new SustainabilityPage(data);
    } else {
        Object.assign(page, data);
    }
    
    await page.save();
    console.log("Successfully updated DB");
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
