const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
} = require("../controller/auth.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshToken);

router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, updateProfile);
router.put("/change-password", isAuthenticated, changePassword);
router.get("/users", isAuthenticated, getAllUsers);

module.exports = router;