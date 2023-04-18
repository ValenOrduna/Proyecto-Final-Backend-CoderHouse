import Product from "../../../models/Product.js";
import ManageDAOMongo from "../db/ManageDAOMongo.js";
import ManageDAOFirebase from "../db/ManageDAOFirebase.js";
import DBFirebase from "../db/FirebaseConfig.js";
import dotenv from "dotenv";

dotenv.config();

class ProductDAOFactory {
  static getDAO() {
    const environment = process.env.NODE_ENV || "development";
    if (environment === "production") {
      return new ManageDAOMongo(Product);
    } else {
      const collection = DBFirebase.collection("products");
      return new ManageDAOFirebase(collection);
    }
  }
}

export default ProductDAOFactory;
