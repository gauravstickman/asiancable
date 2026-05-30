const mongoose = require('mongoose');
const HomepageSettings = require('./src/models/HomepageSettings');

mongoose.connect('mongodb://127.0.0.1:27017/asiancable')
.then(() => console.log('MongoDB Connected...'))
.catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
});

const accordionData = [
  {
    title: "Renewable Energy Cables",
    content:
      "Advanced renewable energy cable systems engineered for solar, wind, and clean energy infrastructure projects.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Telecom & Optical Fibre Cables",
    content:
      "High-performance cables designed for scalable telecom networks, broadband infrastructure, and high-speed data transmission.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Railway Cables",
    content:
      "Reliable railway cable solutions engineered for signaling, rolling stock, and rail infrastructure.",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Conductors",
    content:
      "Premium-grade conductors designed for efficient power transmission and industrial infrastructure.",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Elastomeric & Mining Cables",
    content:
      "Heavy-duty elastomeric and mining cables built for harsh industrial and underground environments.",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Specialty & Industrial Cables",
    content:
      "Custom-engineered specialty cable solutions tailored for industrial and mission-critical operations.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
  },
];

const seedDB = async () => {
    try {
        let settings = await HomepageSettings.findOne();
        if (!settings) {
            settings = new HomepageSettings();
        }
        
        settings.engineering = {
            title: "Engineering Excellence",
            items: accordionData
        };
        
        await settings.save();
        console.log('Engineering data updated successfully.');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
