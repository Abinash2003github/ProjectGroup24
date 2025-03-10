import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import runPy from "../utils/ApiRunPy.js";
import { Crop } from "../models/crops.model.js";

const cropRecommendation = asyncHandler(async (req, res) => {
  const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall } = req.body;

  //check for required fields
  if (!nitrogen) throw new ApiError(401, "Enter the Nitrogen value");
  if (!phosphorus) throw new ApiError(401, "Enter the Phosphorus value");
  if (!potassium) throw new ApiError(401, "Enter the Potassium value");
  if (!temperature) throw new ApiError(401, "Enter the Temperature value");
  if (!humidity) throw new ApiError(401, "Enter the Humidity value");
  if (!ph) throw new ApiError(401, "Enter the pH value");
  if (!rainfall) throw new ApiError(401, "Enter the Rainfall value");

  //Connect and get data from Python Code within "script" by sending the inputs
  const result = await runPy("cropRecommendation.py", [
    nitrogen,
    phosphorus,
    potassium,
    temperature,
    humidity,
    ph,
    rainfall,
  ]);

  //Fetch Data From DataBase
  const cropData = await Crop.findOne({ cropName: result });
  if (!cropData) {
    throw new ApiError(500, "Data Not Found!!!");
  }

  //Store recived data in object
  const data = {
    crop: result,
    growing_period: cropData.growing_period,
  };

  //Send respond
  res.status(201).render("crop_recommendation/crop_recommendation_result", data); // Render HTML
});

export { cropRecommendation };
