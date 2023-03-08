import express from "express";
import passport from "passport";

const router = express.Router();

router.get("", (req, res) => {
  res.render("register", { title: "Curso CoderHouse Backend | Register" });
});

router.post(
  "",
  passport.authenticate("register", {
    failureRedirect: "/registerError",
  }),
  (req, res) => {
    res.status(200).send({ Success: "User Created" });
  }
);
export default router;
