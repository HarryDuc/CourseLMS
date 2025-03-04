import express from "express";
import upload from "../middlewares/upload.js";

const router = express.Router();

// API upload video
router.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No video uploaded!" });
  }
  res.json({ message: "Upload successful", filePath: `/uploads/${req.file.filename}` });
});

export default router;
