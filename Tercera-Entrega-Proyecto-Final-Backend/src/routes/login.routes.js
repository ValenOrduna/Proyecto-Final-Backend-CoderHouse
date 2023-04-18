import express from "express";
import passport from "passport";
import { login, postLogin } from "../controllers/login.controller.js";

const router = express.Router();

router.get("", login);

router.post(
  "",
  passport.authenticate("login", {
    failureRedirect: "/loginError",
  }),
  postLogin
);
export default router;
