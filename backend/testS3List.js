require('dotenv').config();
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const path = require('path');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

async function run() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: 'uploads/'
        });
        const data = await s3.send(command);
        console.log("Total objects found:", data.Contents ? data.Contents.length : 0);
        if (data.Contents) {
            data.Contents.forEach((file, index) => {
                const ext = path.extname(file.Key).toLowerCase();
                const isValid = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
                console.log(`${index + 1}. Key: ${file.Key} | Ext: ${ext} | Valid: ${isValid}`);
            });
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
