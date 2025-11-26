const { uploadToCloudinary } = require("../uploads/multer");
const path = require("path");

const singleFileController = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 400, "No file uploaded");
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const folder = [".mp4", ".mov", ".avi", ".mkv"].includes(ext)
      ? "videos"
      : "images";

    const result = await uploadToCloudinary(req.file.path, folder);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: result.secure_url,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Multiple file upload
const multipleFileController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const urls = [];

    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();
      const folder = [".mp4", ".mov", ".avi", ".mkv"].includes(ext)
        ? "videos"
        : "images";

      const result = await uploadToCloudinary(file.path, folder);
      urls.push(result.secure_url);
    }

    res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      urls,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  singleFileController,
  multipleFileController,
};
