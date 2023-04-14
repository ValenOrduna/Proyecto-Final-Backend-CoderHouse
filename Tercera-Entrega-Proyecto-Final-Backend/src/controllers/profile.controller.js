import { MongoUser } from "../../models/mongoSchema.js";

const profile = async (req, res) => {
  const user = await MongoUser.find(req.session.passport.user);
  res.render("profile", user);
};

export { profile };
