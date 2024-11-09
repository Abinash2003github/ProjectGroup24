import { Router } from "express";
const router = Router();

import path from "path";
// Create a helper function to mimic __dirname
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createUser } from "../controllers/createUser.controller.js";
import { logInUser } from "../controllers/logInUser.controller.js";
import { logOutUser } from "../controllers/logOutUser.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { cropRecommendation } from "../controllers/cropRecommendation.controller.js"

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
      path.join(
        __dirname,
        "../../../Frontend/crop_recommendation/crop_recommendation.html"
      )
    );
  })
  .post(cropRecommendation);

export default router;
