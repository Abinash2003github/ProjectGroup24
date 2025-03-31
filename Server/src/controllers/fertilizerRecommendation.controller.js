import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import runPy from "../utils/ApiRunPy.js";

const fertilizerRecommendation = asyncHandler(async (req, res) => {
  // const { nitrogen, phosphorus, potassium, temperature, humidity, crop_name } = req.body;
  const { nitrogen, phosphorus, potassium, ph, temperature, crop_name } = req.body;  

  //check for required fields
  if (!nitrogen) throw new ApiError(401, "Enter the Nitrogen value");
  if (!phosphorus) throw new ApiError(401, "Enter the Phosphorus value");
  if (!potassium) throw new ApiError(401, "Enter the Potassium value");
  if (!ph) throw new ApiError(401, "Enter the pH value");
  if (!temperature) throw new ApiError(401, "Enter the Temperature value");
  // if (!humidity) throw new ApiError(401, "Enter the Humidity value");
  if (!crop_name) throw new ApiError(401, "Enter the Crop name");

  //Connect and get data from Python Code within "script" by sending the inputs
  const result = await runPy("fertilizerRecommendation.py", [
    nitrogen,
    phosphorus,
    potassium,
    ph,
    temperature,
    // humidity,
    crop_name,
  ]);

  //Store recived data in object
  const data = {
    fertilizerName: result,
  };

  //Send respond
  res.status(201).render("fertilizer_recommendation/fertilizer_recommendation_result", data); // Render HTML
});

export { fertilizerRecommendation };
