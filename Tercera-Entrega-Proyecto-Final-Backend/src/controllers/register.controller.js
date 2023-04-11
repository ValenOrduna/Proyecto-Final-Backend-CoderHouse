import logger from "../../utils/logger.js";

const register = (req, res) => {
  try {
    if (req.session.passport.user) {
      return res.redirect("/home");
    }
  } catch (err) {
    return res.render("register", {
      title: "Curso CoderHouse Backend | Register",
    });
  }
};

const postRegister = (req, res) => {
  logger.info("Usuario creado con exito!");
  return res.status(200).send({ Success: "User Created" });
};

export { register, postRegister };
