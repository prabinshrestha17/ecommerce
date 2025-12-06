const { config } = require("dotenv");

config();

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;
const smtpHost = process.env.SMTP_HOST;
const appPassword = process.env.APP_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
const refreshToken = process.env.JWT_REFRESH_SECRET;

console.log(mongoUri);

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudinaryUrl = process.env.CLOUDINARY_URL;

module.exports = {
  mongoUri,
  refreshToken,
  port,
  smtpHost,
  appPassword,
  jwtSecret,
  cloudName,
  apiKey,
  apiSecret,
  cloudinaryUrl,
};
