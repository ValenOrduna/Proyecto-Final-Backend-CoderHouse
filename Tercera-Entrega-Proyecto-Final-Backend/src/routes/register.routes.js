import express from "express";
import passport from "passport";
import { register, postRegister } from "../controllers/register.controller.js";

const router = express.Router();

router.get("", register);

router.post(
  "",
  passport.authenticate("register", {
    failureRedirect: "/registerError",
  }),
  postRegister
);
export default router;
