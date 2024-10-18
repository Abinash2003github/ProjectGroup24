import { Router } from "express";
const router = Router();

import { createUser } from "../controllers/createUser.controller.js";
router
  .route("/register")
  .get((req, res) => {
    res.status(200).send("Working...");
  })
  .post(async (req, res) => {
    await createUser()
      .then(() => {
        res.status(201).send("User has been successfully created.");
      })
      .catch((err) => {
        res.status(400).send("User creation failed!");
      });
  });

export default router;
