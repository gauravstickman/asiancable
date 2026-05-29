const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Define absolute path to backend/src/uploads
const uploadDir = path.join(__dirname, '../uploads');

// Auto-create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/', protect, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
});

router.get('/', protect, (req, res) => {
    try {
        if (!fs.existsSync(uploadDir)) {
            return res.json({ success: true, files: [] });
        }
        const files = fs.readdirSync(uploadDir);
        const fileList = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
            })
            .map(file => {
                const filePath = path.join(uploadDir, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file,
                    url: `/uploads/${file}`,
                    createdAt: stats.mtime
                };
            })
            .sort((a, b) => b.createdAt - a.createdAt);

        res.json({ success: true, files: fileList });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve media library' });
    }
});

router.delete('/:filename', protect, (req, res) => {
    try {
        const filename = req.params.filename;
        const safeFilename = path.basename(filename);
        const filePath = path.join(uploadDir, safeFilename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ success: true, message: 'Image deleted successfully from library' });
        } else {
            res.status(404).json({ success: false, message: 'Image not found' });
        }
    } catch (error) {
        console.error('Delete failed', error);
        res.status(500).json({ success: false, message: 'Failed to delete image' });
    }
});

module.exports = router;
