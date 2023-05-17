const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const imegeUploadRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Image Upload
 *   description: API endpoints for uploading images
 */

/**
 * @swagger
 * /image-upload/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Image Upload]
 *     parameters:
 *       - in: query
 *         name: directory
 *         required: true
 *         schema:
 *           type: string
 *         description: The directory where the image should be saved
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 *       400:
 *         description: Failure operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         file:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

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
