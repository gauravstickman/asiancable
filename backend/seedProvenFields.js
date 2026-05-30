const mongoose = require('mongoose');
const HomepageSettings = require('./src/models/HomepageSettings');

mongoose.connect('mongodb://127.0.0.1:27017/asiancable')
.then(() => console.log('MongoDB Connected...'))
.catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
});

const projects = [
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description: "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description: "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description: "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description: "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description: "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description: "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description: "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  },
  {
    tag: "RENEWABLES",
    title: "Offshore Platform Power Distribution",
    description: "Supplied specialized cables for an offshore drilling platform in the North Sea.",
    image: "/assets/proven.png",
    badges: ["High Efficiency", "High Load Capacity"],
  }
];

const seedDB = async () => {
    try {
        let settings = await HomepageSettings.findOne();
        if (!settings) {
            settings = new HomepageSettings();
        }
        
        settings.provenFields = projects;
        
        await settings.save();
        console.log('Proven Fields data updated successfully.');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
