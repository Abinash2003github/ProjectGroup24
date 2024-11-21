import mongoose from "mongoose";
import { DB_CONFIG } from "../constant.js";

const connectDB = async () => {
  try {
    const options = { serverSelectionTimeoutMS: 60000 }; // 1-minute timeout
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_CONFIG.NAME}`,
      options
    );
    console.log(`MongoDB Connected !! to ${process.env.MONGODB_URI}/${DB_CONFIG.NAME}`);
    console.log(`DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
