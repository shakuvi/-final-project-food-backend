const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const imegeUploadRoute = express.Router();

const upload = multer({ dest: "uploads/" });

imegeUploadRoute.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  const directory = req.query.directory; // Get the directory from the query parameter

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const ext = path.extname(file.originalname);
  const filePath = path.join(
    __dirname,
    "uploads",
    directory,
    `${file.filename}${ext}`
  ); // Update the file path to include the directory
  fs.rename(file.path, filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save file" });
    }
    return res.json({ success: true, file: filePath });
  });
});

module.exports = imegeUploadRoute;
