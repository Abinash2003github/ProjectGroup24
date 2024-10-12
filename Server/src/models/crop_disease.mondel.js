import mongoose from "mongoose";

const cropDiseaseSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cure: {
    type: String,
    required: true,
  },
});

export const CropDisease = mongoose.model("CropDisease", cropDiseaseSchema);
