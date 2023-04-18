import User from "../../../models/User.js";
import ManageDAOMongo from "../db/ManageDAOMongo.js";
import ManageDAOFirebase from "../db/ManageDAOFirebase.js";
import DBFirebase from "../db/FirebaseConfig.js";

import dotenv from "dotenv";

dotenv.config();

class UserDAOFactory {
  static getDAO() {
    const environment = process.env.NODE_ENV || "development";
    if (environment === "production") {
      return new ManageDAOMongo(User);
    } else {
      const collection = DBFirebase.collection("users");
      const manage = new ManageDAOFirebase(collection);
      return manage;
    }
  }
}

export default UserDAOFactory;
