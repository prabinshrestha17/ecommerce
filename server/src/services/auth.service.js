const Auth = require("../model/auth.model");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { jwtSecret } = require("../api/dotenv");

exports.registerAuth = async (userName, email, password, role = "user") => {
  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await hashPassword(password);
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationTokenExpiry = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ); // 24 hours

    const response = await Auth.create({
      userName,
      email,
      password: hashedPassword,
      role,
      emailVerificationToken,
      emailVerificationTokenExpiry,
    });

    return {
      user: {
        id: response._id,
        userName: response.userName,
        email: response.email,
      },
      emailVerificationToken,
    };
  } catch (error) {
    throw error;
  }
};

exports.loginAuth = async (email, password) => {
  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await comparePassword({
      plainPassword: password,
      hashPassword: user.password,
    });

    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    if (!user.isEmailVerified) {
      throw new Error("Please verify your email first");
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });

    return {
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    throw error;
  }
};

exports.verifyEmail = async token => {
  try {
    const user = await Auth.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      throw new Error("Invalid or expired verification token");
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpiry = null;
    await user.save();

    return {
      success: true,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    };
  } catch (error) {
    throw error;
  }
};

exports.getAllAuth = () => {
  try {
    const response = Auth.find({});
    return response;
  } catch (error) {
    throw error;
  }
};

exports.getAuthById = id => {
  try {
    const response = Auth.findById(id);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.updateAuth = (id, updates) => {
  try {
    const response = Auth.findByIdAndUpdate(id, updates, { new: true });
    return response;
  } catch (error) {
    throw error;
  }
};

exports.deleteAuth = id => {
  try {
    const response = Auth.findByIdAndDelete(id);
    return response;
  } catch (error) {
    throw error;
  }
};
