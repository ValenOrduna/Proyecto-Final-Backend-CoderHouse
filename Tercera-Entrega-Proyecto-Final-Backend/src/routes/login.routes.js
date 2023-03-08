import express from "express";
import passport from "passport";

const router = express.Router();

router.get("", (req, res) => {
  try {
    if (req.session.passport.user) {
      return res.redirect("/home");
    }
  } catch (err) {
    return res.render("login", { title: "Curso CoderHouse Backend | Login" });
  }
});

router.post(
  "",
  passport.authenticate("login", { failureRedirect: "/loginError" }),
  (req, res) => {
    res.status(200).send({ Success: "User Login" });
  }
);
export default router;
