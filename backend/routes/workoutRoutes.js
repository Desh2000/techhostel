const express = require('express');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');

// Import authentication, profile, and inquiry route handlers
const { login } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const { submitInquiry, getInquiries } = require('../controllers/inquiryController');

const router = express.Router();

// Workout routes
// GET all workouts
router.get('/workouts', getWorkouts);

// GET a single workout
router.get('/workouts/:id', getWorkout);

// POST a new workout
router.post('/workouts', createWorkout);

// DELETE a workout
router.delete('/workouts/:id', deleteWorkout);

// UPDATE a workout
router.patch('/workouts/:id', updateWorkout);

// Authentication routes
router.post('/login', login);

// Profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Inquiry routes
router.post('/submit-inquiry', submitInquiry);
router.get('/inquiries', getInquiries);

module.exports = router;
