const mongoose = require('mongoose');
const HeroSlide = require('./src/models/HeroSlide');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/asiancable')
.then(() => console.log('MongoDB Connected...'))
.catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
});

const slides = [
  {
    page: "Homepage",
    image: "/assets/home1.jpg",
    title: "Endurance, by design",
    description: "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Sustainable Impact",
    buttonText: "Explore Products",
    buttonLink: "/products",
  },
  {
    page: "Homepage",
    image: "/assets/home2.png",
    title: "Transforming lives by building sustainable world-class infrastructure",
    description: "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Innovation First",
    buttonText: "Sustainability",
    buttonLink: "/products",
  },
  {
    page: "Homepage",
    image: "/assets/home3.jpg",
    title: "Powering a future that holds the world",
    description: "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Global Excellence",
    buttonText: "Company Impact",
    buttonLink: "/products",
  },
  {
    page: "Homepage",
    image: "/assets/home4.jpg",
    title: "Reliability, Redefined",
    description: "Delivering world-class power and telecom cables for critical infrastructure across industries",
    nextText: "Reliability, Redefined",
    buttonText: "Watch Full Video",
    buttonLink: "/products",
  }
];

const seedDB = async () => {
    try {
        await HeroSlide.deleteMany({ page: "Homepage" });
        console.log('Old homepage slides removed.');
        
        await HeroSlide.insertMany(slides);
        console.log('New hero slides inserted successfully.');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
