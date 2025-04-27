import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import runPy from "../utils/ApiRunPy.js";
import { CropDisease } from "../models/crop_disease.mondel.js";
import path from "path";

// Create a helper function to mimic __dirname
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diseaseDetection = asyncHandler(async (req, res) => {
  const imagePath = req.file?.path?.replace(/\\/g, "/"); // Convert "\aa\b\img.jpg" to "/aa/b/img.jpg"
  const imagePathRelative = imagePath.replace(/.*public/, ""); //Remove everything before /public and

  //check for required fields
  if (!imagePath) throw new ApiError(401, "Enter the leaf image!");

  //Connect and get data from Python Code within "script" by sending the inputs
  const result = await runPy("diseasePredction.py", [imagePath]);

  //Fetch Data From DataBase
  const cropDiseaseData = await CropDisease.findOne({ nameId: result.toString().trim() });
  if (!cropDiseaseData) {
    throw new ApiError(500, "Data Not Found!!!");
  }

  //Store recived data in object
  const data = {
    diseaseName: cropDiseaseData.name,
    diseaseDescription: cropDiseaseData.description,
    diseaseCure: cropDiseaseData.cure,
    diseaseImage: imagePathRelative,
  };

  //send respond
  res.status(201).render("disease_detection/disease_detection-result", data); // Render HTML
});

export { diseaseDetection };
