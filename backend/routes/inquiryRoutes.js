const express = require('express');
const { submitInquiry, getInquiries } = require('../controllers/inquiryController');

const router = express.Router();

// Inquiry routes
router.post('/submit', submitInquiry); // Assuming the inquiry routes are accessed with /submit prefix
router.get('/', getInquiries); // Assuming the inquiry routes are accessed without prefix

module.exports = router;
