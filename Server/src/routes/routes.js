import { Router } from "express";
const router = Router();

import { createUser } from "../controllers/createUser.controller.js";
import { logInUser } from "../controllers/logInUser.controller.js";
import { logOutUser } from "../controllers/logOutUser.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

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


export default router;
