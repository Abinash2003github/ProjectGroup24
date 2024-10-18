import { Router } from "express";
const router = Router();

import { createUser } from "../controllers/createUser.controller.js";
router.route("/register")
  .get((req, res) => {
    res.status(200).send("Working...");
  })
  .post(createUser);

export default router;
