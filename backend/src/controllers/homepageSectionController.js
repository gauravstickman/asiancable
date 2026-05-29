const HeroSlide = require('../models/HeroSlide');
const Testimonial = require('../models/Testimonial');
const ProvenField = require('../models/ProvenField');
const HomepageBlog = require('../models/HomepageBlog');
const EngineeringItem = require('../models/EngineeringItem');
const AboutUs = require('../models/AboutUs');
const HomepageFact = require('../models/HomepageFact');
const HomepageApplication = require('../models/HomepageApplication');
const EngineeringHeader = require('../models/EngineeringHeader');

const getModel = (section) => {
    switch (section) {
        case 'hero-slides': return HeroSlide;
        case 'testimonials': return Testimonial;
        case 'proven-fields': return ProvenField;
        case 'homepage-blogs': return HomepageBlog;
        case 'engineering-items': return EngineeringItem;
        case 'about-us': return AboutUs;
        case 'facts': return HomepageFact;
        case 'applications': return HomepageApplication;
        case 'engineering-header': return EngineeringHeader;
        case 'industry-projects': return require('../models/IndustryProject');
        case 'industry-products': return require('../models/IndustryProduct');
        case 'industry-impacts': return require('../models/IndustryImpact');
        case 'industry-applications': return require('../models/IndustryApp');
        case 'industry-leaders': return require('../models/IndustryLeader');
        default: return null;
    }
};

exports.getAll = async (req, res) => {
    const Model = getModel(req.params.section);
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid section' });
    
    try {
        const items = await Model.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getOne = async (req, res) => {
    const Model = getModel(req.params.section);
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid section' });
    
    try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.create = async (req, res) => {
    const Model = getModel(req.params.section);
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid section' });
    
    try {
        const item = await Model.create(req.body);
        res.status(201).json({ success: true, data: item, message: 'Item created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.update = async (req, res) => {
    const Model = getModel(req.params.section);
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid section' });
    
    try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, data: item, message: 'Item updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.remove = async (req, res) => {
    const Model = getModel(req.params.section);
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid section' });
    
    try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getSingleton = async (req, res) => {
    const Model = getModel(req.params.section);
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid section' });
    try {
        let item = await Model.findOne();
        if (!item) {
            item = await Model.create({});
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateSingleton = async (req, res) => {
    const Model = getModel(req.params.section);
    if (!Model) return res.status(400).json({ success: false, message: 'Invalid section' });
    try {
        let item = await Model.findOne();
        if (!item) {
            item = await Model.create(req.body);
        } else {
            Object.assign(item, req.body);
            // explicit markModified for Mixed types
            if (req.params.section === 'facts') {
                item.markModified('presence');
                item.markModified('decades');
                item.markModified('capacity');
                item.markModified('annual');
            }
            if (req.params.section === 'applications') {
                item.markModified('main');
                item.markModified('small1');
                item.markModified('small2');
                item.markModified('wide');
            }
            await item.save();
        }
        res.status(200).json({ success: true, data: item, message: 'Item updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

