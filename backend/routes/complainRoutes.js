const express = require('express');
const { createComplain, getUserComplains } = require('../controllers/complainController');

const router = express.Router();

// Authentication routes
router.post('/create', createComplain);
router.get('/user', getUserComplains);

module.exports = router;
