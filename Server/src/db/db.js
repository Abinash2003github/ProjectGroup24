import mongoose from "mongoose";
import { DB_CONFIG } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}/${DB_CONFIG.NAME}`);
        console.log(`MongoDB Connected !! DB HOST: ${(await connectionInstance).connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1);
    }
};

export default connectDB;