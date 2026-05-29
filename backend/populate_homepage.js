const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Homepage = require('./src/models/Homepage');

const data = {
  aboutUs: {
    text: "Asian Cables, a part of RPG Group, is one of India’s most respected industrial houses. Our journey began in 1959, at a time when India was building the foundations of its future. Over six decades, we have grown alongside the country, a journey guided by deep commitment to quality, reliability, and engineering discipline."
  },
  heroSlides: [
    {
      title: "Powering Future Networks",
      description: "Advanced cable solutions designed for modern cities and digital transformation",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop",
      nextText: "Global Excellence"
    },
    {
      title: "Reliability, Redefined",
      description: "Delivering world-class power and telecom cables for critical infrastructure across industries",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop",
      nextText: "Innovation First"
    },
    {
      title: "Built For Critical Systems",
      description: "Trusted infrastructure solutions engineered for durability and performance",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop",
      nextText: "Sustainable Impact"
    }
  ],
  applications: {
    main: {
      title: "Specialty Cables",
      description: "Fire-Survival & LSZH, Solar & EV Charging Ready, Oil & Gas Rated",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"
    },
    small1: {
      title: "Power Cables",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop"
    },
    small2: {
      title: "Railway Cables",
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400&auto=format&fit=crop"
    },
    wide: {
      title: "Telecom & OFC",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    }
  },
  facts: {
    presence: {
      title: "Presence in 90+ Countries",
      description: "The company exports cables worldwide, serving global infrastructure projects across Asia, Africa, Europe, the Middle East and Australia.",
      image: "/uploads/1778999211781-Flags.svg"
    },
    decades: {
      title: "6+ Decades",
      subtitle: "Manufacturing Expertise",
      description: "Asian Cables has been delivering advanced cable solutions since its inception, with continuous innovation in power and telecom cable technologies."
    },
    capacity: {
      title: "Up To 220 KV",
      subtitle: "Manufacturing Capability",
      description: "High Voltage and Extra High Voltage cables up to 220 kV are manufactured at the advanced facility in Vadodara."
    },
    annual: {
      value: "3600 Km",
      title: "Annual Cable manufacturing capacity",
      description: "The infrastructure, the expertise, and the scale to power industries across Asia and beyond."
    }
  },
  provenFields: [
    {
      title: "Offshore Platform Power Distribution",
      description: "Supplied specialized cables for an offshore drilling platform in the North Sea.",
      tags: [
        "High Efficiency",
        "High Load Capacity"
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop"
    }
  ],
  engineering: {
    heading: "Engineering Trust. Enabling Progress.",
    image: "/uploads/1779000220562-engineering.png",
    items: [
      {
        title: "Renewable Energy Cables",
        content: "Advanced renewable energy cable systems engineered for solar, wind, and clean energy infrastructure projects."
      },
      {
        title: "Telecom & Optical Fibre Cables",
        content: "High-performance cables designed for scalable telecom networks, broadband infrastructure, and high-speed data transmission, built to meet carrier-grade compliance and evolving bandwidth demands."
      },
      {
        title: "Railway Cables",
        content: "Reliable railway cable solutions engineered for signaling, rolling stock, and critical rail infrastructure applications."
      },
      {
        title: "Conductors",
        content: "Premium-grade conductors designed for efficient power transmission and industrial infrastructure."
      },
      {
        title: "Elastomeric & Mining Cables",
        content: "Heavy-duty elastomeric and mining cables built for harsh industrial and underground environments."
      },
      {
        title: "Specialty & Industrial Cables",
        content: "Custom-engineered specialty cable solutions tailored for industrial and mission-critical operations."
      }
    ]
  },
  blogs: [
    {
      type: "Event",
      title: "Conferences & Summits",
      description: "Providing robust cabling infrastructure for major international summits and high-security venues.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400&auto=format&fit=crop"
    },
    {
      type: "Blog",
      title: "Festivals & Live Experiences",
      description: "Best for creative and large public events with high traffic and multi-location challenges.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop"
    },
    {
      type: "Event",
      title: "Trade Shows & Exhibitions",
      description: "Reliable and flexible power solutions designed for transient displays, booths, and expo pavilions.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop"
    }
  ],
  sustainability: {
    bgImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1920&auto=format&fit=crop",
    heading: "We transform lives by building sustainable world-class infrastructure.",
    primaryBtnText: "Our Green Initiatives",
    secondaryBtnText: "Read Report",
    features: [
      {
        icon: "Leaf",
        title: "Environment",
        description: "IGBC Platinum-certified green factory"
      },
      {
        icon: "ShieldCheck",
        title: "Safety",
        description: "ISO 45001 occupational health & safety certified"
      },
      {
        icon: "Factory",
        title: "Responsible Manufacturing",
        description: "Waste reduction through optimised production"
      }
    ]
  },
  testimonials: [
    {
      text: "We’ve partnered with several providers in the past, but none compared to Asian Cables’ meticulous attention to detail and true dedication to our needs. They made the whole experience seamless — and the outcomes are undeniable.",
      name: "Lynn Tanner",
      role: "Co-Founder | Atomic",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      text: "Working with Asian Cables was like discovering a fresh wave of innovation. They grasped our goals immediately and transformed them into reality with skillful execution and daring design elements.",
      name: "Kevin Arnold",
      role: "Co-Founder | Atomic",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    {
      text: "Asian Cables exceeded expectations. Their team collaborated seamlessly, resulting in a visually stunning and functional end product.",
      name: "Danny Tanner",
      role: "Co-Founder | Atomic",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    }
  ]
};

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin';

console.log('Connecting to database...');
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Clear existing homepage data
    await Homepage.deleteMany({});
    console.log('Cleared existing homepage data');
    
    // Create new homepage document
    const homepage = await Homepage.create(data);
    console.log('Homepage successfully populated with reference data! ID:', homepage._id);
    
    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to populate homepage:', err);
    process.exit(1);
  });
