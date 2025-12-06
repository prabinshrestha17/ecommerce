const jwt = require("jsonwebtoken");

const generateAccessToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = payload => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const verifyToken = (token, type = "access") => {
  try {
    const secret =
      type === "refresh"
        ? process.env.JWT_REFRESH_SECRET
        : process.env.JWT_SECRET;
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
