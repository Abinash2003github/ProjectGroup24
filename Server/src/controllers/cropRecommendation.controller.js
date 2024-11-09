import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import path from "path";
// Create a helper function to mimic __dirname
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { spawn } from "child_process";

//function to run python model
const runPyModel = (nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall) => {
  return new Promise((resolve, reject) => {
    const childPython = spawn(
      "python",
      [
        path.join(__dirname, "../../scripts/cropRecommendation.py").toString(),
        nitrogen,
        phosphorus,
        potassium,
        temperature,
        humidity,
        ph,
        rainfall,
      ].map(String)
    );

    let output = "";
    let err = "";

    childPython.stdout.on("data", (data) => {
      output += data.toString();
    });

    childPython.stderr.on("data", (data) => {
      err += data.toString();
    });

    childPython.on("close", (code) => {
      if (code !== 0) {
        reject(new ApiError(500, err));
      } else {
        resolve(output);
      }
    });
  });
};

//
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

  //connect and get data from py script by sending the inputs
  const result = await runPyModel(
    nitrogen,
    phosphorus,
    potassium,
    temperature,
    humidity,
    ph,
    rainfall
  );

  //store recived data in object
  const data = {
    crop: result,
    growing_period: "60",
  };

  //send respond
  res.status(201).render("crop_recommendation-result", data); // Render HTML
});

export { cropRecommendation };
