import users from "../../models/User.js";

const profile = async (req, res) => {
  const user = await users.findById(req.session.passport.user);
  res.render("profile", user);
};

export { profile };
