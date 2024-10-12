import dotenv from "dotenv"; // "-r dotenv/config --experimental-json-modules" added in "dev" in "scripts" in packet.json file
dotenv.config({
  path: "./env",
});

import { app } from "./app.js";
import connectDB from "./db/db.js";

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Server is running...');
        console.log(`URL: http://localhost:${process.env.PORT}`)
    })
}).catch((err)=>{
    console.error("MongoDB Connection fail:", err);
})
