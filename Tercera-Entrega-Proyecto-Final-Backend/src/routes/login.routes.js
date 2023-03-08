import express from "express";
import passport from "passport";

const router = express.Router();

router.get("", (req, res) => {
  res.render("login", { title: "Curso CoderHouse Backend | Login" });
});

router.post(
  "",
  passport.authenticate("login", { failureRedirect: "/loginError" }),
  (req, res) => {
    res.status(200).send({ Success: "User Login" });
  }
);
export default router;
