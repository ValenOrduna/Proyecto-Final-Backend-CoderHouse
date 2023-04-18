import UserDAO from "../persistence/DAOS/UserDAO.js";

const profile = async (req, res) => {
  const user = await UserDAO.find(req.session.passport.user);
  res.render("profile", user);
};

export { profile };
