import Cart from "../../../models/Cart.js";
import ManageDAOMongo from "../db/ManageDAOMongo.js";
import ManageDAOFirebase from "../db/ManageDAOFirebase.js";
import DBFirebase from "../db/FirebaseConfig.js";
import dotenv from "dotenv";

dotenv.config();

class CartDAOFactory {
  static getDAO() {
    const environment = process.env.NODE_ENV || "development";
    if (environment === "production") {
      return new ManageDAOMongo(Cart);
    } else {
      const collection = DBFirebase.collection("carts");
      return new ManageDAOFirebase(collection);
    }
  }
}

export default CartDAOFactory;
