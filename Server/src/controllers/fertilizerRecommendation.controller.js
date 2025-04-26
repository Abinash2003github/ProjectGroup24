import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import runPy from "../utils/ApiRunPy.js";
import { Fertilizer } from "../models/fertilizer.model.js";

const fertilizerRecommendation = asyncHandler(async (req, res) => {
  // const { nitrogen, phosphorus, potassium, temperature, humidity, crop_name } = req.body;
  const { nitrogen, phosphorus, potassium, ph,humidity,moisture, temperature,soil_type, crop_name } = req.body;  

  //check for required fields
  if (!nitrogen) throw new ApiError(401, "Enter the Nitrogen value");
  if (!phosphorus) throw new ApiError(401, "Enter the Phosphorus value");
  if (!potassium) throw new ApiError(401, "Enter the Potassium value");
  if (!humidity) throw new ApiError(401, "Enter the humidity value");
  if (!moisture) throw new ApiError(401, "Enter the moisture value");
  if (!temperature) throw new ApiError(401, "Enter the Temperature value");
  if (!soil_type) throw new ApiError(401, "Enter the Soil type");
  if (!crop_name) throw new ApiError(401, "Enter the Crop name");

  //Connect and get data from Python Code within "script" by sending the inputs
  const result = await runPy("fertilizerRecommendation.py", [
    nitrogen,
    phosphorus,
    potassium,
    humidity,
    moisture,
    temperature,
    soil_type,
    crop_name,
  ]);


  //Fetch Data From DataBase
    const fertilizerData = await Fertilizer.findOne({ fertilizerName: result.toLowerCase() });
    if (!fertilizerData) {
      throw new ApiError(500, "Data Not Found!!!");
    }

  //Store recived data in object
  const data = {
    fertilizerName: result,
    nitrogen: fertilizerData.N,
    phosphorus: fertilizerData.P,
    potassium: fertilizerData.K,
    ph: fertilizerData.ph,
    temperature: fertilizerData.temperature,
  };

  //Send respond
  res.status(201).render("fertilizer_recommendation/fertilizer_recommendation_result", data); // Render HTML
});

export { fertilizerRecommendation };
