const express = require('express');
const { createFeedback, userFeedbacks, all } = require('../controllers/feedbackController');

const router = express.Router();

// Authentication routes
router.post('/create', createFeedback);
router.get('/user', userFeedbacks);
router.get('/all', all);

module.exports = router;
