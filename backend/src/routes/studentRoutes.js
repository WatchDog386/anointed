// backend/src/routes/studentRoutes.js
const express = require('express');
const multer = require('multer');
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// Configure multer for in-memory file storage (buffer)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

const router = express.Router();

/**
 * @route   GET /api/students
 * @desc    Get all students
 * @access  Public for sponsorship page, Private for admin
 */
// For your use case, we'll make this PUBLIC since ChildSponsorship.jsx fetches without auth
router.get('/', getStudents);

/**
 * @route   POST /api/students
 * @desc    Create a new student
 * @access  Private
 */
router.post('/', protect, upload.single('image'), createStudent);

/**
 * @route   PUT /api/students/:id
 * @desc    Update a student
 * @access  Private
 */
router.put('/:id', protect, upload.single('image'), updateStudent);

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete a student
 * @access  Private
 */
router.delete('/:id', protect, deleteStudent);

module.exports = router;