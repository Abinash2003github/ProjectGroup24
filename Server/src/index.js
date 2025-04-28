import dotenv from "dotenv"; // "-r dotenv/config --experimental-json-modules" added in "dev" in "scripts" in packet.json file
dotenv.config({
    path: "./env",
});

import { app } from "./app.js";
import connectDB from "./db/db.js";

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`\nServer is running at URL: http://localhost:${process.env.PORT}`);
        console.log(`HOME URL: http://localhost:${process.env.PORT}/api/home`)

    })
}).catch((err) => {
    console.error("MongoDB Connection fail:", err);
})