const express = require("express");
const {
  multipleFileController,
  singleFileController,
} = require("../controller/file.controller");
const { upload } = require("../uploads/multer");

const fileRouter = express.Router();

fileRouter.post("/single", upload.single("document"), singleFileController);

fileRouter.post("/multiple", upload.array("document"), multipleFileController);

module.exports = fileRouter;
