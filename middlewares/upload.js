const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'social_media_uploads', // Folder di Cloudinary
    allowed_formats: ['jpg', 'png', 'mp4', 'mov'],
  },
});

const upload = multer({ storage });

module.exports = upload;
