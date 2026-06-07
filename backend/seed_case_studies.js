const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CaseStudy = require('./src/models/CaseStudy');

// Load env
dotenv.config();

const seedCaseStudies = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing case studies
        await CaseStudy.deleteMany();
        console.log('Cleared existing case studies');

        const caseStudies = [
            // Industry 1: Oil & Gas
            {
                title: 'Supply of Fire Resistant Cables for Offshore Platform',
                slug: 'supply-fire-resistant-cables-offshore-platform',
                subtitle: 'Providing robust and safe cabling solutions in harsh marine environments.',
                client: 'Oceanic Oil Corp',
                industry: 'Oil & Gas',
                location: 'North Sea',
                year: '2023',
                overview: 'The offshore platform required completely fire-resistant and highly durable cables that could withstand extreme weather and saltwater corrosion.',
                challenge: 'The primary challenge was ensuring zero signal loss over long distances while maintaining strict safety regulations for fire resistance.',
                solution: 'We engineered custom LSZH (Low Smoke Zero Halogen) Fire Resistant Cables that exceed standard safety requirements.',
                outcome: 'The platform has been operating for over a year with no electrical faults or safety compromises due to cabling.',
                specifications: {
                    productsSupplied: 'LSZH Fire Resistant Cables, Armoured Power Cables',
                    standardsApprovals: 'IEC 60331, BS 6387',
                    keyCustomisation: 'Enhanced saltwater resistance jacket',
                    volumeDelivered: '45,000 meters',
                    supplyYear: '2023'
                },
                bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
                mobileBannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
                documentPdf: 'https://example.com/case-study-oil-1.pdf'
            },
            {
                title: 'Instrumentation Cables for Refinery Expansion',
                slug: 'instrumentation-cables-refinery-expansion',
                subtitle: 'Upgrading the control systems of a major oil refinery.',
                client: 'PetroGlobal Industries',
                industry: 'Oil & Gas',
                location: 'Texas, USA',
                year: '2022',
                overview: 'A major refinery was expanding its processing capabilities and needed highly accurate instrumentation cables to connect new sensors to their central control room.',
                challenge: 'The environment contained high levels of electromagnetic interference (EMI) from heavy machinery.',
                solution: 'We supplied individually and overall shielded instrumentation cables to ensure pristine signal integrity.',
                outcome: 'The refinery expansion was completed ahead of schedule with flawless integration of the new sensor networks.',
                specifications: {
                    productsSupplied: 'Shielded Instrumentation Cables',
                    standardsApprovals: 'BS EN 50288-7',
                    keyCustomisation: 'Double shielding against EMI',
                    volumeDelivered: '120,000 meters',
                    supplyYear: '2022'
                },
                bannerImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80',
                mobileBannerImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&q=80',
                documentPdf: 'https://example.com/case-study-oil-2.pdf'
            },
            // Industry 2: Renewable Energy
            {
                title: 'Solar Farm DC Cabling Network',
                slug: 'solar-farm-dc-cabling-network',
                subtitle: 'Connecting a 500MW solar farm to the main grid.',
                client: 'SunPower Energy Ltd',
                industry: 'Renewable Energy',
                location: 'Rajasthan, India',
                year: '2024',
                overview: 'A new 500MW solar farm required extensive DC cabling to connect solar panels to inverters across a vast desert landscape.',
                challenge: 'The cables needed to withstand intense UV radiation and extreme daily temperature fluctuations.',
                solution: 'We provided specialized UV-resistant Solar DC cables designed for harsh desert environments.',
                outcome: 'The solar farm successfully connected to the grid and is currently powering over 100,000 homes efficiently.',
                specifications: {
                    productsSupplied: 'Solar DC Cables, MV Power Cables',
                    standardsApprovals: 'TUV 2PfG 1169',
                    keyCustomisation: 'Extreme temperature and UV resistance',
                    volumeDelivered: '300,000 meters',
                    supplyYear: '2024'
                },
                bannerImage: 'https://images.unsplash.com/photo-1509391366360-1200b7e1c8c6?w=800&q=80',
                mobileBannerImage: 'https://images.unsplash.com/photo-1509391366360-1200b7e1c8c6?w=400&q=80',
                documentPdf: 'https://example.com/case-study-renewable-1.pdf'
            },
            {
                title: 'Offshore Wind Farm Subsea Cabling',
                slug: 'offshore-wind-farm-subsea-cabling',
                subtitle: 'Transmitting clean energy from offshore wind turbines to the mainland.',
                client: 'Breeze Energy',
                industry: 'Renewable Energy',
                location: 'North Sea',
                year: '2023',
                overview: 'An offshore wind farm required highly durable subsea cables to transmit power generated by the turbines back to the mainland grid.',
                challenge: 'The cables had to be completely waterproof, flexible enough for installation, and resistant to underwater pressure.',
                solution: 'We engineered heavy-duty subsea power cables with multi-layered waterproofing and steel wire armoring.',
                outcome: 'The wind farm is operating at peak capacity with reliable power transmission and zero cable failures.',
                specifications: {
                    productsSupplied: 'Subsea Power Cables (33kV)',
                    standardsApprovals: 'IEC 60502-2',
                    keyCustomisation: 'Enhanced steel wire armoring for subsea use',
                    volumeDelivered: '85,000 meters',
                    supplyYear: '2023'
                },
                bannerImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
                mobileBannerImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80',
                documentPdf: 'https://example.com/case-study-renewable-2.pdf'
            },
            // Industry 3: Infrastructure
            {
                title: 'Metro Rail Network Electrification',
                slug: 'metro-rail-network-electrification',
                subtitle: 'Providing power and control cables for a new city metro network.',
                client: 'MetroTransit Authority',
                industry: 'Infrastructure',
                location: 'Dubai, UAE',
                year: '2025',
                overview: 'A newly constructed metro rail line needed comprehensive cabling for power distribution, signaling, and station infrastructure.',
                challenge: 'The project required massive volumes of cables delivered on a tight schedule, all meeting strict public safety and fire resistance standards.',
                solution: 'We coordinated a massive supply chain effort to deliver LSZH power and signaling cables specifically designed for railway applications.',
                outcome: 'The metro network launched on time, meeting all safety inspections and providing reliable transit for millions of passengers.',
                specifications: {
                    productsSupplied: 'LSZH Power Cables, Signaling Cables',
                    standardsApprovals: 'EN 50264, EN 50306',
                    keyCustomisation: 'Color-coded jackets for rapid installation',
                    volumeDelivered: '500,000 meters',
                    supplyYear: '2024'
                },
                bannerImage: 'https://images.unsplash.com/photo-1555819206-7b30da4f1506?w=800&q=80',
                mobileBannerImage: 'https://images.unsplash.com/photo-1555819206-7b30da4f1506?w=400&q=80',
                documentPdf: 'https://example.com/case-study-infrastructure-1.pdf'
            },
            {
                title: 'Smart City Data Center Connectivity',
                slug: 'smart-city-data-center-connectivity',
                subtitle: 'High-speed fiber optic networking for a central data hub.',
                client: 'TechHub Infrastructure',
                industry: 'Infrastructure',
                location: 'Singapore',
                year: '2024',
                overview: 'A new smart city initiative required a central data center with high-bandwidth, low-latency connectivity to support IoT infrastructure.',
                challenge: 'The installation involved routing cables through dense, pre-existing urban infrastructure with limited space.',
                solution: 'We supplied high-density, flexible fiber optic cables that allowed for easy routing in tight spaces without compromising signal strength.',
                outcome: 'The data center is now the backbone of the smart city, processing terabytes of data daily with minimal latency.',
                specifications: {
                    productsSupplied: 'High-Density Fiber Optic Cables',
                    standardsApprovals: 'ITU-T G.652.D',
                    keyCustomisation: 'Micro-duct compatible outer sheath',
                    volumeDelivered: '200,000 meters',
                    supplyYear: '2024'
                },
                bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
                mobileBannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
                documentPdf: 'https://example.com/case-study-infrastructure-2.pdf'
            }
        ];

        // Insert all
        for (const cs of caseStudies) {
            await CaseStudy.create(cs);
            console.log(`Created case study: ${cs.title}`);
        }

        console.log('Successfully seeded 6 case studies!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedCaseStudies();
