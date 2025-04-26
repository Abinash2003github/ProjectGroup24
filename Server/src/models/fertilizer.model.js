import mongoose from "mongoose";

const fertilizerSchema = new mongoose.Schema({
  fertilizerName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
  ph: {
    type: Number,
    required: true,
  },
  temperature: {
    type: [Number],
    required: true,
  }
});

export const Fertilizer = mongoose.model("Fertilizer", fertilizerSchema);
