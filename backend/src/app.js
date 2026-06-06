const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            process.env.CLIENT_URL,
            'http://localhost:5173',
            'http://localhost:3000',
            'http://187.127.133.212'
        ];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/src/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/blog-categories', require('./routes/blogCategoryRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/homepage-sections', require('./routes/homepageSectionRoutes'));
app.use('/api/industry-page', require('./routes/industryPageRoutes'));
app.use('/api/homepage-settings', require('./routes/homepageSettingsRoutes'));
app.use('/api/manufacturing-page', require('./routes/manufacturingPageRoutes'));
app.use('/api/about-page', require('./routes/aboutPageRoutes'));
app.use('/api/leadership-page', require('./routes/leadershipPageRoutes'));
app.use('/api/sustainability-page', require('./routes/sustainabilityPageRoutes'));
app.use('/api/resources-page', require('./routes/resourcesPageRoutes'));
app.use('/api/investor-page', require('./routes/investorPageRoutes'));
app.use('/api/contact-page', require('./routes/contactPageRoutes'));
app.use('/api/clientele-page', require('./routes/clientelePageRoutes'));
app.use('/api/case-studies', require('./routes/caseStudyRoutes'));
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
