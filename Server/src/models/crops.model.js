import mongoose from "mongoose";

const cropsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  cropsName: {
    type: String,
    required: true,
  },
  N: {
    type: Number,
    required: true,
  },
  P: {
    type: Number,
    required: true,
  },
  K: {
    type: Number,
    required: true,
  },
  moisture: {
    type: Number,
    required: true,
  },
  PH: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7],
  },
  rainfall: {
    type: Number,
    required: true,
  },
  growing_period: {
    type: Number,
    required: true,
  },
});

export const Crop = mongoose.model("Crop", cropsSchema);
