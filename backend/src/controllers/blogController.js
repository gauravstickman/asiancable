const Blog = require('../models/Blog');
const slugify = require('slugify');

exports.createBlog = async (req, res) => {
    try {
        const { title, description, content, image: bodyImage, category, status } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Blog title is required' });
        }
        if (!category) {
            return res.status(400).json({ message: 'Blog category is required' });
        }

        const image = req.file ? req.file.path : (bodyImage || '');
        const slug = slugify(title.toLowerCase().replace(/ /g, '-'), { lower: true, strict: true });

        const blog = await Blog.create({
            title,
            slug,
            description: description || '',
            content: content || '',
            image,
            category,
            status: status || 'published'
        });

        const populated = await Blog.findById(blog._id).populate('category');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.status) {
            query.status = req.query.status;
        }
        const blogs = await Blog.find(query).populate('category').sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('category');
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, description, content, category, status } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            blog.title = title || blog.title;
            if (title) {
                blog.slug = slugify(title.toLowerCase().replace(/ /g, '-'), { lower: true, strict: true });
            }
            blog.description = description !== undefined ? description : blog.description;
            blog.content = content !== undefined ? content : blog.content;
            
            if (req.file) {
                blog.image = req.file.path;
            } else if (req.body.image !== undefined) {
                blog.image = req.body.image;
            }

            blog.category = category || blog.category;
            blog.status = status || blog.status;

            const updatedBlog = await blog.save();
            const populated = await Blog.findById(updatedBlog._id).populate('category');
            res.json(populated);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            await Blog.findByIdAndDelete(req.params.id);
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
