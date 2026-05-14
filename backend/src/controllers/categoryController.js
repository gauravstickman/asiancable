const Category = require('../models/Category');
const slugify = require('slugify');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file ? req.file.path : '';
        
        const category = await Category.create({
            name,
            slug: name.toLowerCase().replace(/ /g, '-'),
            image
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
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
        const { name } = req.body;
        const category = await Category.findById(req.params.id);

        if (category) {
            category.name = name || category.name;
            category.slug = name ? name.toLowerCase().replace(/ /g, '-') : category.slug;
            if (req.file) {
                category.image = req.file.path;
            }

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
        const category = await Category.findById(req.params.id);
        if (category) {
            await category.remove();
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
