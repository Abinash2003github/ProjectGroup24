import mongoose from "mongoose";

const cropsSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  N: {
    type: [Number],
    required: true,
  },
  P: {
    type: [Number],
    required: true,
  },
  K: {
    type: [Number],
    required: true,
  },
  temperature: {
    type: [Number],
    required: true,
  },
  
  humidity: {
    type: [Number],
    required: true,
  },
  ph: {
    type: [Number],
    required: true,
  },
  rainfall: {
    type: [Number],
    required: true,
    default: null,
  },
  growing_period: {
    type: Number,
    required: true,
    default: null,
  },
});

export const Crop = mongoose.model("Crop", cropsSchema);
