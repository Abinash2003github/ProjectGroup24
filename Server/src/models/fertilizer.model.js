import mongoose from "mongoose";

const fertilizerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  fertilizerName: {
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
  PH: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7],
  },
  growing_period: {
    type: Number,
    required: true,
  },
});

export const Fertilizer = mongoose.model("Fertilizer", fertilizerSchema);
