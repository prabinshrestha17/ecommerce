const { uploadToCloudinary } = require("../uploads/multer");

// Single file upload
const singleFileController = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const buffer = req.file.buffer;
    const ext = req.file.mimetype.includes("video") ? "video" : "image";
    const folder = ext === "video" ? "videos" : "images";

    const result = await uploadToCloudinary(buffer, folder);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: { url: result.secure_url },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Multiple file upload
const multipleFileController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const urls = await Promise.all(
      req.files.map(async file => {
        const buffer = file.buffer;
        const ext = file.mimetype.includes("video") ? "video" : "image";
        const folder = ext === "video" ? "videos" : "images";

        const result = await uploadToCloudinary(buffer, folder);
        return result.secure_url;
      })
    );

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
