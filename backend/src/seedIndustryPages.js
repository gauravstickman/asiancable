const mongoose = require('mongoose');
const dotenv = require('dotenv');
const IndustryPage = require('./models/IndustryPage');

dotenv.config();

const industryData = [
  {
    name: 'Oil & Gas',
    slug: 'oil-and-gas',
    headerTitle: 'Oil & Gas',
    headerDescription: 'Enabling uninterrupted operations across upstream, midstream, and downstream facilities through cabling solutions aligned to safety protocols, reliability requirements, and asset integrity expectations. Specialized cable solutions support energy infrastructure including refineries, petrochemical plants and pipeline protection systems.',
    headerBgImage: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1920',
    stats: [
      { value: '4500 Km', label: 'Cables Supplied' },
      { value: 'Zero', label: 'Failures in 10 Yrs' },
      { value: 'DNV-GL', label: 'Certified' }
    ],
    provenProjectsTitle: 'Proven in the Oil Field',
    provenProjectsSubtitle: 'Explore our track record of successful deployments in harsh onshore and offshore environments.',
    projects: [
      { company: 'National Petroleum', title: 'Offshore Platform Upgrade', description: 'Complete overhaul of power and instrumentation cabling for a deepwater rig.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600', tags: ['Offshore', 'High Temp'] },
      { company: 'Global Refinery', title: 'Pipeline Monitoring Network', description: 'Supplied 200km of specialized fiber and control cables for leak detection.', image: 'https://images.unsplash.com/photo-1570784381397-ff0f3796dcf5?q=80&w=600', tags: ['Midstream', 'Safety'] }
    ],
    trustedTitle: 'Trusted by Industry Leaders',
    trustedLogos: [
      'https://placehold.co/150x80?text=Aramco',
      'https://placehold.co/150x80?text=BP',
      'https://placehold.co/150x80?text=Shell'
    ],
    productsTitle: 'Specialized Cables for Oil & Gas',
    impactTitle: 'Driving Safety in Oil & Gas',
    impacts: [
      { title: 'Fire Survival', description: 'Cables designed to maintain integrity during intense fires.', icon: 'https://placehold.co/50?text=FS' },
      { title: 'Mud Resistant', description: 'Withstands harsh drilling fluids and chemicals.', icon: 'https://placehold.co/50?text=MR' }
    ],
    applicationsTitle: 'Critical Applications',
    applications: [
      { title: 'Downhole Pumps', description: 'Powering ESPs at extreme depths.', image: 'https://images.unsplash.com/photo-1519808383344-93e150f82c40?q=80&w=400' },
      { title: 'Refinery Control', description: 'Instrumentation for precise process control.', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400' }
    ]
  },
  {
    name: 'Utilities',
    slug: 'utilities',
    headerTitle: 'Utilities',
    headerDescription: 'Powering communities with robust, high-capacity transmission and distribution cables. Our solutions ensure minimal transmission loss, high resilience against environmental factors, and reliable energy delivery for regional and national grids.',
    headerBgImage: 'https://images.unsplash.com/photo-1473643265141-863a1523491b?q=80&w=1920',
    stats: [
      { value: '10,000 Km', label: 'Grid Cables' },
      { value: '400 kV', label: 'Max Voltage' },
      { value: '99.9%', label: 'Uptime Support' }
    ],
    provenProjectsTitle: 'Powering Nations',
    provenProjectsSubtitle: 'Key utility projects driving global electrification.',
    projects: [
      { company: 'State Power Grid', title: 'City Ring Main Upgrade', description: 'Upgraded aging 33kV networks to new 66kV underground XLPE cables.', image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=600', tags: ['Underground', 'High Voltage'] }
    ],
    trustedTitle: 'Utility Partners',
    trustedLogos: [
      'https://placehold.co/150x80?text=National+Grid',
      'https://placehold.co/150x80?text=EDF'
    ],
    productsTitle: 'High Voltage Utility Cables',
    impactTitle: 'Asian Cables Impact on Utilities',
    impacts: [
      { title: 'Reduced Line Loss', description: 'Advanced conductor design minimizes power dissipation.', icon: 'https://placehold.co/50?text=RL' },
      { title: 'Longer Lifespan', description: 'Superior cross-linked polymers ensure 40+ years of service.', icon: 'https://placehold.co/50?text=LL' }
    ],
    applicationsTitle: 'Grid Applications',
    applications: [
      { title: 'Substations', description: 'Interconnecting transformers and switchgear.', image: 'https://images.unsplash.com/photo-1513828742140-cc5ce2361406?q=80&w=400' },
      { title: 'Overhead Lines', description: 'Bare conductors for long-distance transmission.', image: 'https://images.unsplash.com/photo-1622253811195-faee06ebdf9e?q=80&w=400' }
    ]
  },
  {
    name: 'Renewables',
    slug: 'renewables',
    headerTitle: 'Renewables',
    headerDescription: 'Empowering the green transition with specialized solar, wind, and energy storage cable solutions. Built to withstand extreme UV, ozone, and dynamic mechanical stresses while maximizing energy yield.',
    headerBgImage: 'https://images.unsplash.com/photo-1509391366360-1200c825a072?q=80&w=1920',
    stats: [
      { value: '5 GW', label: 'Projects Supported' },
      { value: '25+ Yrs', label: 'Design Life' },
      { value: 'TUV', label: 'Certified' }
    ],
    provenProjectsTitle: 'Green Energy Milestones',
    provenProjectsSubtitle: 'Connecting the largest solar and wind farms to the grid.',
    projects: [
      { company: 'GreenEnergy Co', title: '500MW Solar Park', description: 'Supplied all DC string cables and MV collection networks.', image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=600', tags: ['Solar', 'DC'] },
      { company: 'OffshoreWind', title: 'Coastal Wind Farm', description: 'Torsion-resistant cables for wind turbine nacelles.', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600', tags: ['Wind', 'Dynamic'] }
    ],
    trustedTitle: 'Renewable Leaders',
    trustedLogos: [
      'https://placehold.co/150x80?text=Vestas',
      'https://placehold.co/150x80?text=First+Solar'
    ],
    productsTitle: 'Solar & Wind Cables',
    impactTitle: 'Accelerating the Transition',
    impacts: [
      { title: 'UV Resilience', description: 'Special sheathing prevents degradation from sunlight.', icon: 'https://placehold.co/50?text=UV' }
    ],
    applicationsTitle: 'Renewable Applications',
    applications: [
      { title: 'Floating Solar', description: 'Waterproof DC cables for reservoir installations.', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=400' },
      { title: 'Turbine Towers', description: 'Flexible cables enduring constant rotation.', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=400' }
    ]
  },
  {
    name: 'Infrastructure',
    slug: 'infrastructure',
    headerTitle: 'Infrastructure',
    headerDescription: 'The backbone of modern cities. We provide Fire Survival (FS), Low Smoke Zero Halogen (LSZH), and structured cabling for metros, airports, hospitals, and smart city developments ensuring public safety and seamless connectivity.',
    headerBgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920',
    stats: [
      { value: '50+', label: 'Metros & Airports' },
      { value: '100%', label: 'LSZH Compliant' },
      { value: '3 Hrs', label: 'Fire Survival' }
    ],
    provenProjectsTitle: 'Building the Future',
    provenProjectsSubtitle: 'Cabling the world’s most iconic infrastructure projects.',
    projects: [
      { company: 'Metro Rail Corp', title: 'Underground Metro Line 3', description: 'Supplied fire survival cables for tunnel ventilation and emergency lighting.', image: 'https://images.unsplash.com/photo-1513689622998-6ce2b083c076?q=80&w=600', tags: ['Metro', 'Safety'] }
    ],
    trustedTitle: 'Infrastructure Partners',
    trustedLogos: [
      'https://placehold.co/150x80?text=L&T',
      'https://placehold.co/150x80?text=Siemens'
    ],
    productsTitle: 'Infrastructure Cabling',
    impactTitle: 'Safety Above All',
    impacts: [
      { title: 'Zero Toxic Gas', description: 'LSZH materials ensure safe evacuation during fires.', icon: 'https://placehold.co/50?text=LS' }
    ],
    applicationsTitle: 'Infrastructure Applications',
    applications: [
      { title: 'Airports', description: 'Powering runway lighting and terminal operations.', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400' },
      { title: 'High Rises', description: 'Vertical power distribution and building management.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400' }
    ]
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    headerTitle: 'Manufacturing',
    headerDescription: 'Robust, flexible, and interference-free cabling for heavy machinery, robotics, and assembly lines. Our industrial cables keep the wheels of production turning 24/7 without downtime.',
    headerBgImage: 'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1920',
    stats: [
      { value: '20,000+', label: 'Factories Powered' },
      { value: '10M+', label: 'Flex Cycles' },
      { value: '24/7', label: 'Reliability' }
    ],
    provenProjectsTitle: 'Driving Automation',
    provenProjectsSubtitle: 'Success stories from global manufacturing floors.',
    projects: [
      { company: 'AutoMakers Inc', title: 'Robotic Assembly Line', description: 'Provided high-flex drag chain cables for robotic welding arms.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600', tags: ['Robotics', 'Flex'] }
    ],
    trustedTitle: 'Trusted Manufacturers',
    trustedLogos: [
      'https://placehold.co/150x80?text=Toyota',
      'https://placehold.co/150x80?text=ABB'
    ],
    productsTitle: 'Automation & Control Cables',
    impactTitle: 'Minimizing Downtime',
    impacts: [
      { title: 'High Flexibility', description: 'Cables that withstand millions of bending cycles.', icon: 'https://placehold.co/50?text=HF' }
    ],
    applicationsTitle: 'Factory Applications',
    applications: [
      { title: 'Drag Chains', description: 'Moving cable tracks for automated machinery.', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400' }
    ]
  },
  {
    name: 'Industrial',
    slug: 'industrial',
    headerTitle: 'Industrial',
    headerDescription: 'Heavy-duty power and control cables designed to withstand chemical exposure, mechanical impact, and extreme temperatures found in cement, steel, and mining industries.',
    headerBgImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1920',
    stats: [
      { value: 'Heavy', label: 'Duty Certified' },
      { value: 'Armor', label: 'Protection' },
      { value: '100%', label: 'Chemical Resistant' }
    ],
    provenProjectsTitle: 'Industrial Might',
    provenProjectsSubtitle: 'Delivering power where others fail.',
    projects: [
      { company: 'Global Steel', title: 'Blast Furnace Wiring', description: 'Heat-resistant cables capable of operating near molten steel.', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600', tags: ['Steel', 'High Temp'] }
    ],
    trustedTitle: 'Industrial Giants',
    trustedLogos: [
      'https://placehold.co/150x80?text=Tata+Steel',
      'https://placehold.co/150x80?text=Holcim'
    ],
    productsTitle: 'Armored & Heat Resistant Cables',
    impactTitle: 'Toughness Guaranteed',
    impacts: [
      { title: 'Mechanical Armor', description: 'Steel wire armor protects against crushing impacts.', icon: 'https://placehold.co/50?text=SWA' }
    ],
    applicationsTitle: 'Industrial Applications',
    applications: [
      { title: 'Mining Excavators', description: 'Trailing cables for heavy earth-moving equipment.', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400' }
    ]
  },
  {
    name: 'Transportation',
    slug: 'transportation',
    headerTitle: 'Transportation',
    headerDescription: 'Advanced cabling systems for railways, rolling stock, signaling, and EV infrastructure. We keep the world moving with vibration-resistant and high-durability solutions.',
    headerBgImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1920',
    stats: [
      { value: '1M+ Km', label: 'Railway Cables' },
      { value: 'EN 45545', label: 'Rail Certified' },
      { value: 'DC Fast', label: 'EV Ready' }
    ],
    provenProjectsTitle: 'Keeping the World Moving',
    provenProjectsSubtitle: 'Signaling and power for the modern transit era.',
    projects: [
      { company: 'National Railways', title: 'Signaling Network Upgrade', description: 'Interlocking control cables for 500km of railway track.', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=600', tags: ['Railway', 'Signaling'] }
    ],
    trustedTitle: 'Transit Authorities',
    trustedLogos: [
      'https://placehold.co/150x80?text=Alstom',
      'https://placehold.co/150x80?text=Bombardier'
    ],
    productsTitle: 'Rolling Stock & EV Cables',
    impactTitle: 'Reliable Transit',
    impacts: [
      { title: 'Vibration Proof', description: 'Stranded conductors that resist loosening during transit.', icon: 'https://placehold.co/50?text=VP' }
    ],
    applicationsTitle: 'Transport Applications',
    applications: [
      { title: 'Locomotive Power', description: 'High-current cables within trains and locomotives.', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=400' },
      { title: 'EV Charging Hubs', description: 'Liquid-cooled cables for ultra-fast vehicle charging.', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=400' }
    ]
  }
];

const seedIndustryPages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin');
        console.log('Connected to DB...');
        
        // Remove old industry pages to ensure clean seeding
        await IndustryPage.deleteMany({});
        console.log('Cleared existing industry pages');

        for (const page of industryData) {
            await IndustryPage.create(page);
            console.log(`Created rich industry page: ${page.name}`);
        }

        console.log('Industry Pages Seeded Successfully with Rich Data!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding industry pages:', error);
        process.exit(1);
    }
};

seedIndustryPages();
