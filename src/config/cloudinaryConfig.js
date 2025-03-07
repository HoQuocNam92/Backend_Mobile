const cloudinary = require('cloudinary').v2;
require('dotenv').config();
// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Tên Cloudinary của bạn
    api_key: process.env.CLOUDINARY_API_KEY, // API Key
    api_secret: process.env.CLOUDINARY_API_SECRET, // API Secret
});

module.exports = cloudinary;
