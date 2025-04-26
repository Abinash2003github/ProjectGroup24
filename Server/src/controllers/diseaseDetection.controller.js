import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import path from 'path';

// Create a helper function to mimic __dirname
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const diseaseDetection = asyncHandler(async (req, res) => {
  const imagePath = req.file.path
    .replace(/.*public/, ''); // Remove everything before /public

  const data = {
    diseaseName: req.body.crop,
    diseaseDescription: req.file.path,
    diseaseCure: imagePath,
    diseaseImage: imagePath
  };
  //send respond
  res.status(201).render("disease_detection/disease_detection-result", data); // Render HTML
});

export { diseaseDetection };
