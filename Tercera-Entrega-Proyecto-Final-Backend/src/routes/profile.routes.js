import express from "express";
import users from "../../models/User.js";
const router = express.Router();

router.get("", async (req, res) => {
  const user = await users.findById(req.session.passport.user);
  res.render("profile", user);
});

export default router;
