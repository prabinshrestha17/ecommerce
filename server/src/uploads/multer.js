const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImageExts = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/svg+xml",
  ];
  const allowedVideoExts = ["video/mp4", "video/mov", "video/avi", "video/mkv"];

  if (
    allowedImageExts.includes(file.mimetype) ||
    allowedVideoExts.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Unsupported file type! Only images and videos allowed."),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 50 },
  fileFilter,
});

const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

module.exports = { upload, uploadToCloudinary };
