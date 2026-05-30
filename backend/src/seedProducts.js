const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Industry = require('./models/IndustryPage');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin';

const seedProducts = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing products to avoid duplicates or keep them?
        // Let's clear them so we have exactly 16 pristine products.
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Fetch categories and industries
        const categories = await Category.find();
        const industries = await Industry.find();

        if (categories.length === 0) {
            console.log("No categories found! Please create some categories first.");
            process.exit(1);
        }

        const sampleProducts = [
            {
                name: "High Voltage Power Cable (11kV - 33kV)",
                description: "Premium high voltage cables engineered for utility and industrial power transmission with XLPE insulation.",
                features: ["Excellent electrical properties", "High thermal stability", "Resistant to moisture and chemicals"],
                specifications: [
                    { label: "Voltage Rating", value: "11 kV to 33 kV" },
                    { label: "Conductor", value: "Stranded Copper/Aluminum" },
                    { label: "Insulation", value: "XLPE (Cross-Linked Polyethylene)" }
                ],
                idealFor: ["Substations", "Power Plants", "Heavy Industries"],
                overviewDescription: "Our high voltage cables provide exceptional reliability for critical power infrastructure, ensuring seamless energy transmission across vast distances with minimal loss.",
                overviewImage: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1200",
                standards: ["IEC 60502-2", "BS 6622", "IS 7098"],
                catalogueName: "HV Power Cables Catalogue",
                catalogueDescription: "Complete specifications for 11kV-33kV cables.",
                catalogueImage: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1200",
                cataloguePdf: "/pdfs/hv-cables.pdf",
                applications: [
                    { title: "Power Distribution", tag: "PRIMARY", description: "City power grids and sub-transmission.", image: "https://images.unsplash.com/photo-1473643265141-863a1523491b?q=80&w=1200" },
                    { title: "Industrial Complexes", tag: "HEAVY DUTY", description: "Powering large manufacturing plants.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200" }
                ],
                projects: [
                    { tag: "UTILITIES", title: "National Grid Upgrade", description: "Supplied 500km of 33kV cables.", image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200", badges: ["On Time", "High Voltage"] }
                ],
                stats: [
                    { value: "500+ km", label: "Supplied Annually" },
                    { value: "33 kV", label: "Max Voltage" },
                    { value: "100%", label: "Tested" }
                ],
                image: "https://images.unsplash.com/photo-1558442074-3c19857bc1dc?q=80&w=1200"
            },
            {
                name: "Fire Survival Cables (FS)",
                description: "Specialized fire-resistant cables designed to maintain circuit integrity during fire scenarios.",
                features: ["Maintains power during fire", "Low smoke emission", "Zero halogen materials"],
                specifications: [
                    { label: "Fire Resistance", value: "Up to 950°C for 3 hours" },
                    { label: "Sheath", value: "LSZH (Low Smoke Zero Halogen)" }
                ],
                idealFor: ["Hospitals", "High-rise Buildings", "Underground Metro"],
                overviewDescription: "Crucial for life safety systems, these cables ensure that emergency lighting, alarms, and fire pumps continue running even in extreme heat.",
                overviewImage: "https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=1200",
                standards: ["BS 6387", "IEC 60331", "IS 17505"],
                catalogueName: "Fire Safety Cables",
                catalogueDescription: "Guide to FS cables and applications.",
                catalogueImage: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1200",
                applications: [
                    { title: "Metro Rail", tag: "CRITICAL", description: "Underground tunnel safety systems.", image: "https://images.unsplash.com/photo-1513689622998-6ce2b083c076?q=80&w=1200" }
                ],
                projects: [
                    { tag: "INFRASTRUCTURE", title: "City Metro Line", description: "Fire safety cables for 15 stations.", image: "https://images.unsplash.com/photo-1596700720499-c9cb9e9d6d31?q=80&w=1200", badges: ["Life Safety"] }
                ],
                stats: [
                    { value: "950°C", label: "Fire Resistance" },
                    { value: "3 Hours", label: "Integrity" },
                    { value: "Zero", label: "Toxic Gases" }
                ],
                image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200"
            },
            {
                name: "Solar DC Cables (TUV Approved)",
                description: "High-performance UV and ozone resistant cables specifically formulated for solar PV installations.",
                features: ["UV resistant", "Weather proof", "Expected lifespan of 25 years"],
                specifications: [
                    { label: "Voltage Rating", value: "1.5 kV DC" },
                    { label: "Conductor", value: "Tinned Copper" }
                ],
                idealFor: ["Solar Farms", "Rooftop Solar", "Floating Solar"],
                overviewDescription: "Built to withstand harsh environmental conditions, ensuring maximum power yield from solar panels to inverters.",
                overviewImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200",
                standards: ["EN 50618", "IEC 62930"],
                catalogueName: "Solar Cable Guide",
                catalogueDescription: "Data sheets for PV cables.",
                catalogueImage: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1200",
                applications: [
                    { title: "Solar Parks", tag: "RENEWABLES", description: "Large scale utility solar.", image: "https://images.unsplash.com/photo-1509391366360-1200c825a072?q=80&w=1200" }
                ],
                projects: [
                    { tag: "SOLAR", title: "100MW Solar Park", description: "Supplied complete DC cabling.", image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200", badges: ["Green Energy"] }
                ],
                stats: [
                    { value: "25+ Yrs", label: "Lifespan" },
                    { value: "1.5kV", label: "DC Rating" },
                    { value: "TUV", label: "Certified" }
                ],
                image: "https://images.unsplash.com/photo-1592833159057-6ade16551c6c?q=80&w=1200"
            },
            {
                name: "Marine & Offshore Cables",
                description: "Ruggedized cables for marine vessels and offshore platforms, resistant to saltwater, mud, and oil.",
                features: ["Mud resistant", "Flame retardant", "Halogen-free"],
                specifications: [
                    { label: "Insulation", value: "EPR (Ethylene Propylene Rubber)" },
                    { label: "Armor", value: "Galvanized Steel Wire Braid" }
                ],
                idealFor: ["Ships", "Oil Rigs", "Naval Vessels"],
                overviewDescription: "Certified by major marine classification societies, these cables endure the harshest maritime conditions.",
                overviewImage: "https://images.unsplash.com/photo-1549443574-8b89e3ec04ff?q=80&w=1200",
                standards: ["IEC 60092", "NEK 606"],
                catalogueName: "Marine Cables PDF",
                catalogueDescription: "Offshore cabling solutions.",
                catalogueImage: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1200",
                applications: [
                    { title: "Oil Rigs", tag: "OFFSHORE", description: "Power and control for drilling.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200" }
                ],
                projects: [
                    { tag: "MARINE", title: "Deepwater Platform", description: "Complete instrumentation cabling.", image: "https://images.unsplash.com/photo-1549443574-8b89e3ec04ff?q=80&w=1200", badges: ["DNV Approved"] }
                ],
                stats: [
                    { value: "100%", label: "Mud Resistant" },
                    { value: "DNV", label: "Approved" }
                ],
                image: "https://images.unsplash.com/photo-1534068307374-2795c6f671c6?q=80&w=1200"
            }
        ];

        // Generate 12 more generic products dynamically to reach 16
        for(let i = 5; i <= 16; i++) {
            sampleProducts.push({
                name: `Industrial Cable Series ${i}000`,
                description: `High-quality industrial cabling solution designed for versatile applications in demanding environments.`,
                features: ["Durable jacket", "Flexible conductor", "Cost-effective"],
                specifications: [
                    { label: "Voltage", value: "600/1000V" },
                    { label: "Material", value: "PVC/XLPE" }
                ],
                idealFor: ["Factories", "Warehouses", "Commercial Buildings"],
                overviewDescription: `The Series ${i}000 offers unmatched performance for general industrial wiring, providing safety and reliability at a competitive price point.`,
                overviewImage: "https://images.unsplash.com/photo-1574689049597-7e6d4bcabc88?q=80&w=1200",
                standards: ["IEC 60502-1", "IS 1554"],
                catalogueName: `Series ${i}000 Catalogue`,
                catalogueDescription: "Technical specs and load charts.",
                catalogueImage: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1200",
                applications: [
                    { title: "Manufacturing", tag: "INDUSTRIAL", description: "Powering assembly lines.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200" }
                ],
                projects: [
                    { tag: "FACTORY", title: `Auto Plant ${i}`, description: "Supplied general wiring.", image: "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1200", badges: ["Success"] }
                ],
                stats: [
                    { value: `${i * 10}+`, label: "Installations" },
                    { value: "1000V", label: "Rating" }
                ],
                image: "https://images.unsplash.com/photo-1541888062972-e56598c0b0b8?q=80&w=1200"
            });
        }

        // Assign random categories and industries to all 16 products
        for (let i = 0; i < sampleProducts.length; i++) {
            const prod = sampleProducts[i];
            
            // Assign random category
            prod.category = categories[Math.floor(Math.random() * categories.length)]._id;
            
            // 70% chance to assign an industry
            if (industries.length > 0 && Math.random() > 0.3) {
                prod.industry = industries[Math.floor(Math.random() * industries.length)]._id;
            } else {
                prod.industry = null;
            }

            await Product.create(prod);
        }

        console.log(`Successfully seeded ${sampleProducts.length} products!`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
