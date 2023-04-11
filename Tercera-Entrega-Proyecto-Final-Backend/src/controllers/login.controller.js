import logger from "../../utils/logger.js";

const login = (req, res) => {
  try {
    if (req.session.passport.user) {
      return res.redirect("/home");
    }
  } catch (err) {
    return res.render("login", { title: "Curso CoderHouse Backend | Login" });
  }
};

const postLogin = (req, res) => {
  res.status(200).send({ Success: "User Login" });
};

export { login, postLogin };
