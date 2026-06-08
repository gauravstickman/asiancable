const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ClientelePage = require('./src/models/ClientelePage');

dotenv.config();

const seedClientele = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if clientele data exists, if not create
        let settings = await ClientelePage.findOne();

        const defaultClients = [
            {
                name: "Saudi Electric Company",
                industry: "Power",
                location: "Saudi Arabia",
                logo: "/assets/clientele/powerIcons.png",
                region: "International",
                description: "The Saudi Electric Company is a top electricity provider "
            },
            {
                name: "Dubai Municipality",
                industry: "Infrastructure",
                location: "UAE",
                logo: "/assets/clientele/industryIcons.png",
                region: "International",
                description: ""
            },
            {
                name: "Qatar Rail",
                industry: "Railway",
                location: "Qatar",
                logo: "/assets/clientele/bluietIcons.png",
                region: "International",
                description: ""
            },
            {
                name: "Etisalat",
                industry: "Telecom",
                location: "UAE",
                logo: "/assets/clientele/distIcons.png",
                region: "International",
                description: "Etisalat is a leading telecom operator in the UAE delivering innovative connectivity and digital services."
            },
            {
                name: "ADNOC",
                industry: "Power",
                location: "UAE",
                logo: "/assets/clientele/powerIcons.png",
                region: "International",
                description: ""
            },
            {
                name: "Kenya Power",
                industry: "Power",
                location: "Kenya",
                logo: "/assets/clientele/powerIcons.png",
                region: "International",
                description: "Kenya Power provides electricity distribution and reliable power services across Kenya."
            },
            {
                name: "Bangladesh Railway",
                industry: "Railway",
                location: "Bangladesh",
                logo: "/assets/clientele/bluietIcons.png",
                region: "International",
                description: ""
            },
            {
                name: "Nepal Telecom",
                industry: "Telecom",
                location: "Nepal",
                logo: "/assets/clientele/distIcons.png",
                region: "International",
                description: ""
            },
            {
                name: "Sri Lanka Ports",
                industry: "Infrastructure",
                location: "Sri Lanka",
                logo: "/assets/clientele/industryIcons.png",
                region: "International",
                description: "Sri Lanka Ports manages and operates major ports and maritime infrastructure in Sri Lanka."
            },
            // Domestic examples
            {
                name: "Power Grid Corporation of India",
                industry: "Power",
                location: "India",
                logo: "/assets/clientele/powerIcons.png",
                region: "Domestic",
                description: "Power Grid Corporation plans and operates India's national power transmission network."
            },
            {
                name: "Railways India",
                industry: "Railway",
                location: "India",
                logo: "/assets/clientele/bluietIcons.png",
                region: "Domestic",
                description: "Railways India oversees major rail infrastructure and passenger/freight services nationwide."
            },
            {
                name: "BSNL",
                industry: "Telecom",
                location: "India",
                logo: "/assets/clientele/distIcons.png",
                region: "Domestic",
                description: "BSNL is a state-owned telecom operator providing connectivity across urban and rural India."
            }
        ];

        if (!settings) {
            settings = new ClientelePage({
                heroTitle: 'Trusted By\nIndustry Leaders',
                heroDesktopImage: '/assets/clientele/clienteleheaderIcons.png',
                heroMobileImage: '/assets/clientele/clienteleheaderIcons.png',
                heroStats: [
                    { value: '2500+', label: 'Employees' },
                    { value: '15+', label: 'Locations' },
                    { value: '50+', label: 'Open Positions' }
                ],
                regions: [
                    { name: 'International', icon: '/assets/clientele/globe.png' },
                    { name: 'Domestic', icon: '/assets/clientele/flag-of-india.png' }
                ],
                industries: ['All Industries', 'Power', 'Telecom', 'Infrastructure', 'Railway', 'Industrial'],
                clients: defaultClients
            });
            await settings.save();
            console.log('Created ClientelePage document and seeded clients.');
        } else {
            settings.clients = defaultClients;
            settings.industries = ['All Industries', 'Power', 'Telecom', 'Infrastructure', 'Railway', 'Industrial'];
            settings.regions = [
                { name: 'International', icon: '/assets/clientele/globe.png' },
                { name: 'Domestic', icon: '/assets/clientele/flag-of-india.png' }
            ];
            await settings.save();
            console.log('Updated ClientelePage document and seeded clients.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedClientele();
