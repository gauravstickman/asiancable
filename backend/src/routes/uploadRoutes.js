const express = require('express');
const { ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const protect = require('../middleware/authMiddleware');
const { uploadS3, s3 } = require('../middleware/uploadS3');

const router = express.Router();

router.post('/', protect, uploadS3.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // req.file.location contains the public URL of the uploaded image
    res.json({ url: req.file.location });
});

router.get('/', protect, async (req, res) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: 'uploads/'
        });

        const data = await s3.send(command);
        
        if (!data.Contents) {
            return res.json({ success: true, files: [] });
        }

        const fileList = data.Contents
            .filter(file => {
                const ext = path.extname(file.Key).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
            })
            .map(file => {
                return {
                    name: path.basename(file.Key),
                    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
                    createdAt: file.LastModified
                };
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({ success: true, files: fileList });
    } catch (error) {
        console.error('Failed to retrieve media library from S3', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve media library' });
    }
});

router.delete('/:filename', protect, async (req, res) => {
    try {
        const filename = req.params.filename;
        const safeFilename = path.basename(filename);
        const fileKey = `uploads/${safeFilename}`;

        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
        });

        await s3.send(command);
        res.json({ success: true, message: 'Image deleted successfully from library' });
    } catch (error) {
        console.error('Delete failed', error);
        res.status(500).json({ success: false, message: 'Failed to delete image' });
    }
});

module.exports = router;
