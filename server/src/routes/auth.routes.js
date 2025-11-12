const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  verifyEmailController,
  logoutController,
} = require("../controller/auth.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

// Public routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/verify-email/:token", verifyEmailController);

// Protected routes
router.post("/logout", isAuthenticated, logoutController);

module.exports = router;
