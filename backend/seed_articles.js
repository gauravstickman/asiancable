const mongoose = require('mongoose');
const Blog = require('./src/models/Blog');
require('dotenv').config({ path: './.env' });

async function seedArticles() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const articles = [
            {
                title: "The Future of Power Transmission: High-Voltage Cables",
                slug: "future-of-power-transmission-high-voltage-cables",
                description: "Exploring the latest advancements in high-voltage cable technology and how it's shaping the future of global power distribution.",
                content: "High-voltage cables are the backbone of modern power grids. As renewable energy sources become more prevalent, the demand for efficient long-distance power transmission has skyrocketed. This article delves into the innovative materials and designs that are making next-generation cables more reliable and efficient than ever before.",
                image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                category: "Innovation",
                readTime: "5 min",
                status: "published",
                author: {
                    name: "Rajesh Kumar",
                    bio: "Lead Engineer at Asian Cables with 15 years of experience in power transmission.",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    linkedin: "https://linkedin.com"
                },
                sections: [
                    {
                        title: "Advanced Materials",
                        description: "New cross-linked polyethylene (XLPE) compounds are pushing the boundaries of what's possible in insulation, offering higher thermal stability and longer lifespans.",
                        images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
                    },
                    {
                        title: "Grid Integration",
                        description: "Seamlessly connecting offshore wind farms and solar parks to the main grid requires submarine and underground cables that can withstand extreme environments.",
                        images: ["https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
                    }
                ]
            },
            {
                title: "Sustainable Manufacturing in the Cable Industry",
                slug: "sustainable-manufacturing-cable-industry",
                description: "How Asian Cables is leading the charge in eco-friendly production methods and reducing the carbon footprint of cable manufacturing.",
                content: "Sustainability is no longer a buzzword; it's a necessity. At Asian Cables, we are actively transforming our manufacturing processes to minimize environmental impact. From recycling copper and aluminum to utilizing renewable energy in our plants, every step is optimized for a greener tomorrow.",
                image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                category: "Sustainability",
                readTime: "4 min",
                status: "published",
                author: {
                    name: "Priya Sharma",
                    bio: "Sustainability Director focusing on eco-friendly industrial practices.",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                    linkedin: "https://linkedin.com"
                },
                sections: [
                    {
                        title: "Recycling & Waste Management",
                        description: "Our state-of-the-art recycling facilities ensure that scrap metal and plastics are repurposed, achieving a 90% reduction in landfill waste.",
                        images: ["https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
                    },
                    {
                        title: "Energy Efficient Plants",
                        description: "By installing solar panels and optimizing machine efficiency, we've significantly lowered the energy consumption per kilometer of cable produced.",
                        images: ["https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
                    }
                ]
            }
        ];

        // Insert or update articles
        for (const article of articles) {
            await Blog.findOneAndUpdate(
                { slug: article.slug },
                article,
                { upsert: true, returnDocument: 'after' }
            );
            console.log(`Upserted: ${article.title}`);
        }

        console.log('Successfully seeded 2 Articles!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding articles:', error);
        process.exit(1);
    }
}

seedArticles();
