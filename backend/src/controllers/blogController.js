const Blog = require('../models/Blog');
const slugify = require('slugify');

exports.createBlog = async (req, res) => {
    try {
        const { title, description, content, image: bodyImage, category, status, sections, author, readTime } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Blog title is required' });
        }
        const image = req.file ? req.file.path : (bodyImage || '');
        let slug = slugify(title.toLowerCase().replace(/ /g, '-'), { lower: true, strict: true });
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        const blog = await Blog.create({
            title,
            slug,
            description: description || '',
            content: content || '',
            image,
            category,
            sections: sections || [],
            author: author || {},
            status: status || 'published',
            readTime: readTime || '10 min'
        });

        const populated = await Blog.findById(blog._id);
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
        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
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
        const { title, description, content, category, status, sections, author, readTime } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            blog.title = title || blog.title;
            if (title) {
                let newSlug = slugify(title.toLowerCase().replace(/ /g, '-'), { lower: true, strict: true });
                if (newSlug !== blog.slug) {
                    const existingBlog = await Blog.findOne({ slug: newSlug });
                    if (existingBlog) {
                        newSlug = `${newSlug}-${Math.floor(Math.random() * 1000)}`;
                    }
                    blog.slug = newSlug;
                }
            }
            blog.description = description !== undefined ? description : blog.description;
            blog.content = content !== undefined ? content : blog.content;
            
            if (req.file) {
                blog.image = req.file.path;
            } else if (req.body.image !== undefined) {
                blog.image = req.body.image;
            }

            blog.category = category || blog.category;
            if (sections !== undefined) {
                blog.sections = sections;
            }
            if (author !== undefined) {
                blog.author = author;
            }
            blog.status = status || blog.status;
            if (readTime !== undefined) {
                blog.readTime = readTime;
            }

            const updatedBlog = await blog.save();
            const populated = await Blog.findById(updatedBlog._id);
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
