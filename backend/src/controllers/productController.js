const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { name, category, industry, description, specifications, idealFor, overviewDescription, standards, features, catalogueName, catalogueDescription, catalogueImage, cataloguePdf, applications, projects, stats, image: bodyImage, overviewImage: bodyOverviewImage } = req.body;
        const image = req.files && req.files.image ? req.files.image[0].path : (bodyImage || '');
        const overviewImage = req.files && req.files.overviewImage ? req.files.overviewImage[0].path : (bodyOverviewImage || '');

        const product = await Product.create({
            name,
            category: category || null,
            industry: industry || null,
            description,
            specifications: specifications ? JSON.parse(specifications) : [],
            idealFor: idealFor ? JSON.parse(idealFor) : [],
            overviewDescription,
            overviewImage,
            standards: standards ? JSON.parse(standards) : [],
            features: features ? JSON.parse(features) : [],
            catalogueName,
            catalogueDescription,
            catalogueImage,
            cataloguePdf,
            applications: applications ? JSON.parse(applications) : [],
            projects: projects ? JSON.parse(projects) : [],
            stats: stats ? JSON.parse(stats) : [],
            image
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category', 'name')
            .populate('industry', 'name');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .populate('industry', 'name');
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, category, industry, description, specifications, idealFor, overviewDescription, standards, features, catalogueName, catalogueDescription, catalogueImage, cataloguePdf, applications, projects, stats } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            if (category !== undefined) product.category = category || null;
            if (industry !== undefined) product.industry = industry || null;
            if (description !== undefined) product.description = description;
            if (specifications !== undefined) product.specifications = JSON.parse(specifications);
            if (idealFor !== undefined) product.idealFor = JSON.parse(idealFor);
            if (overviewDescription !== undefined) product.overviewDescription = overviewDescription;
            if (standards !== undefined) product.standards = JSON.parse(standards);
            if (features !== undefined) product.features = JSON.parse(features);
            
            if (catalogueName !== undefined) product.catalogueName = catalogueName;
            if (catalogueDescription !== undefined) product.catalogueDescription = catalogueDescription;
            if (catalogueImage !== undefined) product.catalogueImage = catalogueImage;
            if (cataloguePdf !== undefined) product.cataloguePdf = cataloguePdf;
            
            if (applications !== undefined) product.applications = JSON.parse(applications);
            if (projects !== undefined) product.projects = JSON.parse(projects);
            if (stats !== undefined) product.stats = JSON.parse(stats);
            
            if (req.files && req.files.image) {
                product.image = req.files.image[0].path;
            } else if (req.body.image !== undefined) {
                product.image = req.body.image;
            }

            if (req.files && req.files.overviewImage) {
                product.overviewImage = req.files.overviewImage[0].path;
            } else if (req.body.overviewImage !== undefined) {
                product.overviewImage = req.body.overviewImage;
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
