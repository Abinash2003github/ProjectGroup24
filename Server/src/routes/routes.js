import { Router } from "express";
const router = Router();

import path from "path";
// Create a helper function to mimic __dirname
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createUser, logInUser, logOutUser } from "../controllers/user.controller.js";
import { cropRecommendation } from "../controllers/cropRecommendation.controller.js";
import { fertilizerRecommendation } from "../controllers/fertilizerRecommendation.controller.js";
import { diseaseDetection } from "../controllers/diseaseDetection.controller.js";

//import middleware
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

router
  .route("/register")
  .get((req, res) => {
    res.status(200).send("<h1>/register is Working...<h1>");
  })
  .post(createUser);

router
  .route("/login")
  .get((req, res) => {
    res.status(200).send("<h1>/login is Working...</h1>");
  })
  .post(logInUser);

//secure routes
router.route("/logout").post(verifyJWT, logOutUser);

//render template [use  "path.join(__dirname,"../../../Frontend")" to access files from Frontend ]
router
  .route("/crops_recommendation")
  .get((req, res) => {
    res.sendFile(
      path.join(__dirname, "../../../Frontend/crop_recommendation/crop_recommendation.html")
    );
  })
  .post(cropRecommendation);

router
  .route("/fertilizer_recommendation")
  .get((req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "../../../Frontend/fertilizer_recommendation/fertilizer_recommendation.html"
      )
    );
  })
  .post(fertilizerRecommendation);

router
  .route("/disease_detection")
  .get((req, res) => {
    res.sendFile(
      path.join(__dirname, "../../../Frontend/disease_detection/disease_detection.html")
    );
  })
  .post(upload.single("img"), diseaseDetection);

export default router;
