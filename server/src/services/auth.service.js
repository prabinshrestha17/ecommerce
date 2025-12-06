const Auth = require("../model/auth.model");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/jwt");
const {
  generateEmailVerificationToken,
  generatePasswordResetToken,
  generateOTP,
  hashToken,
} = require("../utils/cryptoToken");
const { sendEmail } = require("../email/sendEmail");

exports.RegisterService = async ({ name, email, password, role = "user" }) => {
  const existingUser = await Auth.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);
  const { token: verificationToken, expires } =
    generateEmailVerificationToken();
  const hashedVerificationToken = hashToken(verificationToken);

  const user = await Auth.create({
    name,
    email,
    password: hashedPassword,
    role,
    isVerified: false,
    verificationToken: hashedVerificationToken,
    verificationTokenExpires: expires,
  });

  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({ id: user._id });

  const verificationLink = `http://localhost:8000/auth/verify-email/${verificationToken}`;
  await sendEmail({
    to: user.email,
    subject: "Verify Your Email",
    html: `Click this link to verify: ${verificationLink}`,
  });

  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.verificationToken;

  return { success: true, user: userResponse, accessToken, refreshToken };
};

exports.LoginService = async ({ email, password }) => {
  const user = await Auth.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  if (!user.isVerified) throw new Error("Please verify your email first");

  const isPasswordValid = await comparePassword({
    plainPassword: password,
    hashPassword: user.password,
  });

  if (!isPasswordValid) throw new Error("Invalid credentials");

  user.lastLogin = new Date();
  await user.save();

  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({ id: user._id });

  const userResponse = user.toObject();
  delete userResponse.password;

  return { success: true, user: userResponse, accessToken, refreshToken };
};

exports.VerifyEmailService = async token => {
  const hashedToken = hashToken(token);

  const user = await Auth.findOne({
    verificationToken: hashedToken,
    verificationTokenExpires: { $gt: new Date() },
  });

  if (!user) throw new Error("Invalid or expired token");

  user.isVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpires = null;
  await user.save();

  return { success: true, message: "Email verified" };
};

exports.ForgotPasswordService = async email => {
  const user = await Auth.findOne({ email });
  if (!user) throw new Error("User not found");

  const { token: resetToken, expires } = generatePasswordResetToken();
  const hashedResetToken = hashToken(resetToken);

  user.resetPasswordToken = hashedResetToken;
  user.resetPasswordExpires = expires;
  await user.save();

  const resetLink = `http://localhost:8000/auth/reset-password/${resetToken}`;
  await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    html: `<a href="${resetLink}">Click to reset password</a>`,
  });

  return { success: true, message: "Reset email sent" };
};

exports.ResetPasswordService = async (token, newPassword) => {
  const hashedToken = hashToken(token);

  const user = await Auth.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) throw new Error("Invalid or expired token");

  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return { success: true, message: "Password reset successful" };
};

exports.RefreshTokenService = async refreshToken => {
  const decoded = verifyToken(refreshToken, "refresh");

  const user = await Auth.findById(decoded.id);
  if (!user) throw new Error("User not found");

  const newAccessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return { success: true, accessToken: newAccessToken };
};

exports.GetProfileService = async userId => {
  const user = await Auth.findById(userId).select("-password");
  if (!user) throw new Error("User not found");
  return { success: true, user };
};

exports.UpdateProfileService = async (userId, { name }) => {
  const user = await Auth.findByIdAndUpdate(
    userId,
    { name },
    { new: true }
  ).select("-password");

  return { success: true, user };
};

exports.ChangePasswordService = async (
  userId,
  { currentPassword, newPassword }
) => {
  const user = await Auth.findById(userId);

  const isValid = await comparePassword({
    plainPassword: currentPassword,
    hashPassword: user.password,
  });

  if (!isValid) throw new Error("Current password is incorrect");

  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();

  return { success: true, message: "Password changed" };
};

exports.GetAllUsersService = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    Auth.find().select("-password").skip(skip).limit(limit),
    Auth.countDocuments(),
  ]);

  return {
    success: true,
    users,
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  };
};