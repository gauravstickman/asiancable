const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const app = require('./app');

connectDB();

const PORT = process.env.PORT || 5000;

// Force restart to pick up new AWS S3 credentials from .env
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
