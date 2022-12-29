const admin = require("firebase-admin");
const fs = require("fs");
const CRUDProducts = require("./CRUDProducts");
const CRUDCart = require("./CRUDCart");
const CrudProducts = new CRUDProducts();
const CrudCart = new CRUDCart();

module.exports = class Firebase {
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
    CrudProducts.create(this.dbProducts, product);
  }

  readProducts() {
    CrudProducts.find(this.dbProducts);
  }

  updateProduct(product, updateProduct) {
    CrudProducts.update(this.dbProducts, product, updateProduct);
  }

  deleteProduct(product) {
    CrudProducts.delete(this.dbProducts, product);
  }

  createCart() {
    CrudCart.create(this.dbCart);
  }

  readProductsCart(id) {
    CrudCart.read(this.dbCart, id);
  }

  deleteCart(id) {
    CrudCart.delete(this.dbCart, id);
  }

  insertProductCart(id, product) {
    CrudCart.insertProduct(this.dbCart, id, product);
  }

  deleteProductCart(id, nameProduct) {
    CrudCart.deleteProduct(this.dbCart, id, nameProduct);
  }
};
