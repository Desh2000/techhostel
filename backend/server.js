const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
var cookieSession = require("cookie-session");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

const corsConfig = {
  origin: true,
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors({ credentials: true, origin: `http://localhost:3000` })); // Enable Cross-Origin Resource Sharing
app.options("*", cors(corsConfig));

// Global middleware for every request
// To validate JSON web token
app.use((req, res, next) => {
  // Exclude login and registration routes from JWT checks
  if (req.path === "/api/auth/login" || req.path === "/api/auth/register") {
    return next();
  }

  // Extract json token from header
  try {
    const jwt_token = req.headers.cookie.split(";")[0].split("=")[1];
    if (!jwt_token) {
      return res.status(401).send("Authorization error: No token found");
    }

    // Validate jwt token
    if (!validateJWTToken(req, jwt_token)) {
      return res
        .status(401)
        .send("Authorization Error: Token validation error");
    }
  } catch (error) {
    return res.status(401).send("Authorization error: No token found");
  }

  // Continue with the request if everything is fine
  next();
});

// Validate token
function validateJWTToken(req, jwt_token) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    // Verify token
    const verified = jwt.verify(jwt_token, jwtSecretKey);
    if (verified) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Routes
const workoutRoutes = require("./routes/workoutRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const inquiriesRoutes = require("./routes/inquiryRoutes");
const complainRoutes = require("./routes/complainRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const gatePassRoutes = require("./routes/gatePassRoutes");

app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/profile", profileRoutes); // User profile routes
app.use("/api/inquiries", inquiriesRoutes); // Inquiry and feedback routes
app.use("/api/workouts", workoutRoutes); // Workout routes
app.use("/api/complains", complainRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/gatepasses", gatePassRoutes);

async function run() {
  // Connect to MongoDB database
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      // Listen for requests
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Connecting to db and SERVER IS WORKING ON PORT ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

run();

// Default route
app.get("/", (req, res) => {
  const number = 10;
  const multi = 8;
  const result = number + multi;
  console.log(result);
  res.json({ mssg: "Welcome to the app" });
});
