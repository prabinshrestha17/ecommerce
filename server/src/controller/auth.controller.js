const {
  emailVerificationTemplate,
  welcomeEmailTemplate,
} = require("../email/emailVerificationTemplate");
const { sendEmail } = require("../email/sendEmail");
const {
  registerAuth,
  loginAuth,
  verifyEmail,
} = require("../services/auth.service");

exports.registerController = async (req, res, next) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;

    // Validation
    if (!userName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const { user, emailVerificationToken } = await registerAuth(
      userName,
      email,
      password
    );

    // Send verification email
    const verificationLink = `${
      process.env.CLIENT_URL || "http://localhost:5173"
    }/verify-email/${emailVerificationToken}`;

    await sendEmail({
      to: email,
      subject: "Verify Your Email - Ecommerce",
      html: emailVerificationTemplate(userName, verificationLink),
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyEmailController = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    const result = await verifyEmail(token);

    // Send welcome email
    await sendEmail({
      to: result.user.email,
      subject: "Welcome to Ecommerce",
      html: welcomeEmailTemplate(result.user.userName),
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: result.user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const { token, user } = await loginAuth(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logoutController = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
