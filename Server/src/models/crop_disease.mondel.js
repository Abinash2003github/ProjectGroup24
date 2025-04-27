import mongoose from "mongoose";

const cropDiseaseSchema = new mongoose.Schema({
  nameId: {
    type: String,
    required: true,
    unique: true,
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
