const BlogCategory = require('../models/BlogCategory');
const slugify = require('slugify');

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }
        const slug = slugify(name.toLowerCase().replace(/ /g, '-'), { lower: true, strict: true });
        
        const category = await BlogCategory.create({
            name,
            slug,
            description: description || ''
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.find({}).sort({ createdAt: -1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await BlogCategory.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await BlogCategory.findById(req.params.id);

        if (category) {
            category.name = name || category.name;
            if (name) {
                category.slug = slugify(name.toLowerCase().replace(/ /g, '-'), { lower: true, strict: true });
            }
            category.description = description !== undefined ? description : category.description;

            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await BlogCategory.findById(req.params.id);
        if (category) {
            await BlogCategory.findByIdAndDelete(req.params.id);
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
