const express = require('express');
const { createGatePass, userGatePasses } = require('../controllers/gatePassController');

const router = express.Router();

// Authentication routes
router.post('/create', createGatePass);
router.get('/user', userGatePasses);

module.exports = router;
