import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const fertilizerRecommendation = asyncHandler(async (req, res) => {
  //send respond
  const data = {
    fertilizerName: "Name"
  };
  res.status(201).render("fertilizer_recommendation/fertilizer_recommendation_result", data); // Render HTML
});

export { fertilizerRecommendation };
