require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./src/models/Blog');
const BlogCategory = require('./src/models/BlogCategory');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-admin';

const seedBlogs = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');

        // 1. Update existing blogs
        const existingBlogs = await Blog.find({});
        for (let blog of existingBlogs) {
            let updated = false;
            
            // Migrate content to sections if needed
            if (blog.sections.length === 0 && blog.content) {
                blog.sections.push({
                    title: blog.title || 'Introduction',
                    description: blog.content,
                    images: []
                });
                updated = true;
            }

            // Ensure author exists
            if (!blog.author || !blog.author.name) {
                blog.author = {
                    name: 'System Admin',
                    bio: 'Administrator at Asian Cables.',
                    image: '',
                    linkedin: ''
                };
                updated = true;
            }

            if (updated) {
                await blog.save();
                console.log(`Updated existing blog: ${blog.title}`);
            }
        }

        // 2. Add 10 new blogs
        // Get a category if exists
        let category = await BlogCategory.findOne();
        if (!category) {
            category = await BlogCategory.create({
                name: 'Technology',
                slug: 'technology',
                description: 'Technology related news'
            });
            console.log('Created dummy category');
        }

        const dummyBlogs = [];
        for (let i = 1; i <= 10; i++) {
            dummyBlogs.push({
                title: `Sample Blog Post ${i}: The Future of Tech`,
                slug: `sample-blog-post-${i}-${Date.now()}`,
                description: `This is a brief snippet for blog post ${i} to display on the homepage grid.`,
                image: '', // Can be empty or placeholder
                category: category._id,
                author: {
                    name: `Author ${i}`,
                    bio: `Passionate writer and tech enthusiast. Author of ${i} posts.`,
                    image: '',
                    linkedin: 'https://linkedin.com/'
                },
                sections: [
                    {
                        title: 'Introduction',
                        description: 'This section introduces the topic. We will explore various technological advancements in this post.',
                        images: []
                    },
                    {
                        title: 'Deep Dive',
                        description: 'Here we dive deeper into the core subject matter. Notice how the sections allow for distinct segments of content.',
                        images: []
                    }
                ],
                status: 'published'
            });
        }

        await Blog.insertMany(dummyBlogs);
        console.log('Successfully inserted 10 dummy blogs.');

        process.exit(0);
    } catch (err) {
        console.error('Error seeding blogs:', err);
        process.exit(1);
    }
};

seedBlogs();
