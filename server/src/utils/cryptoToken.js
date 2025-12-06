const crypto = require("crypto");

const generateSecureToken = (bytes = 32, expiryHours = 24) => {
  const token = crypto.randomBytes(bytes).toString("hex");
  const expires = new Date(Date.now() + expiryHours * 60 * 60 * 1000);
  return { token, expires };
};

exports.generateEmailVerificationToken = () => {
  return generateSecureToken(32, 24);
};

exports.generatePasswordResetToken = () => {
  return generateSecureToken(32, 1);
};

exports.generateInvitationToken = () => {
  return generateSecureToken(32, 168);
};

exports.generateOTP = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

exports.hashToken = token => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
