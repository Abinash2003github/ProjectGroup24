import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

// Create a helper function to mimic __dirname
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../Frontend/crop_recommendation"));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "../public")));
// app.use(express.static(path.join(__dirname, '../../Frontend')));
app.use(cookieParser());

//routes
import router from "./routes/routes.js";
app.use("/api", router);

export { app };
