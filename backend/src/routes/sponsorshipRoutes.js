// backend/src/routes/sponsorshipRoutes.js
const express = require('express');
const { submitSponsorshipInterest } = require('../controllers/sponsorshipController');

const router = express.Router();

/**
 * @route   POST /api/sponsorship/interest
 * @desc    Submit sponsorship interest for a student
 * @access  Public
 */
router.post('/interest', submitSponsorshipInterest);

module.exports = router;