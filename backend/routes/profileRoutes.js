const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');

const router = express.Router();

// Profile routes
router.get('/', getUserProfile); // Assuming the profile routes are accessed without prefix
router.put('/', updateUserProfile); // Assuming the profile routes are accessed without prefix

module.exports = router;
