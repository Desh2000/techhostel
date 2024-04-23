const express = require("express");
const {
  login,
  getUser,
  logout,
  changePassword,
  addUser,
} = require("../controllers/authController");

const router = express.Router();

// Authentication routes
router.post("/login", login);
router.get("/user", getUser);
router.get("/logout", logout);
router.post("/change_password", changePassword);
router.post("/register", addUser);

module.exports = router;
