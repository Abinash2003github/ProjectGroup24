import { Router } from "express";
const router = Router();

import { createUser } from "../controllers/createUser.controller.js";
import { logInUser } from "../controllers/logInUser.controller.js";

router.route("/register")
  .get((req, res) => {
    res.status(200).send("<h1>/register is Working...<h1>");
  })
  .post(createUser);

router.route("/login")
  .get((req, res) => {
    res.status(200).send("<h1>/login is Working...</h1>");
  })
  .post(logInUser);

export default router;
