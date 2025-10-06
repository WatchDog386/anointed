// /backend/src/middleware/uploadMiddleware.js
const multer = require('multer');

// Store files in memory as Buffer (required for Cloudinary stream upload)
const storage = multer.memoryStorage();

// Allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (e.g., JPG, PNG, GIF).'), false);
  }
};

// Configure multer with limits and filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB max file size
  },
});

// Handle multer errors globally (e.g., file too large, wrong type)
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
    }
    return res.status(400).json({ message: 'File upload error: ' + err.message });
  }
  if (err.message && err.message.includes('Only image files')) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

// Export reusable middleware
module.exports = {
  uploadSingle: upload.single('image'),
  handleMulterError,
};