import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
      lowercase: true,
    },
    middlename: {
      type: String,
      lowercase: true,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: [Number],
      required: true,
    },
    village: {
        type: String,
    },
    state:{
        type: String,
        lowercase: true,
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
