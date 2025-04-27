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
  const des= "Apple Cedar Apple Rust is a fungal disease that affects apple trees and needs both apple and cedar (or juniper) trees to spread. It causes yellow-orange spots on apple leaves, which can lead to leaf damage and poor fruit growth. To control it, remove nearby cedar trees, use fungicides in early spring, prune infected parts, and plant disease-resistant apple varieties. Keeping trees healthy also helps protect them from the disease."
  const cu="Managing Apple Cedar Apple Rust involves several steps. Removing nearby cedar or juniper trees can help break the disease cycle. Applying fungicides like myclobutanil or propiconazole during early spring protects new leaves from infection. Regular pruning of infected leaves and branches helps limit the spread. Planting rust-resistant apple varieties and maintaining healthy tree care practices, such as proper watering and fertilization, also strengthen the tree's natural defenses against the disease."
  const data = {
    diseaseName: "Apple Cedar Apple Rust",
    diseaseDescription: des,
    diseaseCure: cu,
    diseaseImage: imagePath
  };
  //send respond
  res.status(201).render("disease_detection/disease_detection-result", data); // Render HTML
});

export { diseaseDetection };
