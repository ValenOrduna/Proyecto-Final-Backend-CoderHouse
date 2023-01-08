import admin from "firebase-admin";
import fs from "fs";
import CRUDCart from "./CRUDCart.js";
import CRUDProducts from "./CRUDProducts.js";

const CrudProducts = new CRUDProducts();
const CrudCart = new CRUDCart();

class Firebase {
  constructor(credentials) {
    const serviceAccount = JSON.parse(fs.readFileSync(credentials, "utf-8"));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    this.client = admin.firestore();
    this.dbProducts = this.client.collection("products");
    this.dbCart = this.client.collection("cart");
  }

  createProduct(product) {
    return CrudProducts.create(this.dbProducts, product);
  }

  readProducts() {
    return CrudProducts.find(this.dbProducts);
  }

  findProduct(idProduct) {
    return CrudProducts.findOne(this.dbProducts, idProduct);
  }

  updateProduct(idProduct, updateProduct) {
    return CrudProducts.update(this.dbProducts, idProduct, updateProduct);
  }

  deleteProduct(idProduct) {
    return CrudProducts.delete(this.dbProducts, idProduct);
  }

  createCart() {
    return CrudCart.create(this.dbCart);
  }

  readProductsCart(idCart) {
    return CrudCart.read(this.dbCart, idCart);
  }

  deleteCart(id) {
    return CrudCart.delete(this.dbCart, id);
  }

  insertProductCart(idCart, product) {
    return CrudCart.insertProduct(this.dbCart, idCart, product);
  }

  deleteProductCart(idCart, idProduct) {
    return CrudCart.deleteProduct(this.dbCart, idCart, idProduct);
  }
}

export default Firebase;
