const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { name, category, industry, description, specifications, idealFor, overviewDescription, standards, features, featuresImage, catalogueName, catalogueDescription, catalogueImage, cataloguePdf, applications, projects, stats, image: bodyImage, overviewImage: bodyOverviewImage } = req.body;
        const image = req.files && req.files.image ? req.files.image[0].path : (bodyImage || '');
        const overviewImage = req.files && req.files.overviewImage ? req.files.overviewImage[0].path : (bodyOverviewImage || '');

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const product = await Product.create({
            name,
            slug,
            category: category || null,
            industry: industry || null,
            description,
            specifications: specifications ? JSON.parse(specifications) : [],
            idealFor: idealFor ? JSON.parse(idealFor) : [],
            overviewDescription,
            overviewImage,
            standards: standards ? JSON.parse(standards) : [],
            features: features ? JSON.parse(features) : [],
            featuresImage,
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

exports.getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
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
        const { name, category, industry, description, specifications, idealFor, overviewDescription, standards, features, featuresImage, catalogueName, catalogueDescription, catalogueImage, cataloguePdf, applications, projects, stats } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            if (name) {
                product.name = name;
                product.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            }
            if (category !== undefined) product.category = category || null;
            if (industry !== undefined) product.industry = industry || null;
            if (description !== undefined) product.description = description;
            if (specifications !== undefined) product.specifications = JSON.parse(specifications);
            if (idealFor !== undefined) product.idealFor = JSON.parse(idealFor);
            if (overviewDescription !== undefined) product.overviewDescription = overviewDescription;
            if (standards !== undefined) product.standards = JSON.parse(standards);
            if (features !== undefined) product.features = JSON.parse(features);
            if (featuresImage !== undefined) product.featuresImage = featuresImage;
            
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

exports.migrateSlugs = async (req, res) => {
    try {
        const products = await Product.find({});
        let updatedCount = 0;
        
        for (const product of products) {
            if (!product.slug || product.slug.trim() === '') {
                const generatedSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                
                let finalSlug = generatedSlug;
                let counter = 1;
                while (await Product.findOne({ slug: finalSlug, _id: { $ne: product._id } })) {
                    finalSlug = `${generatedSlug}-${counter}`;
                    counter++;
                }

                product.slug = finalSlug;
                await product.save();
                updatedCount++;
            }
        }
        
        res.json({ success: true, message: `Migrated ${updatedCount} products to include slugs.`, totalProductsChecked: products.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error during migration' });
    }
};
