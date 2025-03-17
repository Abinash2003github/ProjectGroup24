import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const diseaseDetection = asyncHandler(async (req, res) => {
  const data = {
    diseaseName: req.body.crop,
    diseaseDescription: req.file.path,
    diseaseCure: "Cure",
  };
  //send respond
  res.status(201).render("disease_detection/disease_detection-result", data); // Render HTML
});

export { diseaseDetection };
