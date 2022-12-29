const { MongoClient } = require("mongodb");
const CRUDProducts = require("./CRUDProducts");
const CRUDCart = require("./CRUDCart");
const CrudProducts = new CRUDProducts();
const CrudCart = new CRUDCart();

module.exports = class Mongo {
  constructor(uri) {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.client.connect();
    const db = this.client.db("coderhouse");
    this.dbProducts = db.collection("products");
    this.dbCart = db.collection("cart");
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

  async closeClient() {
    await this.client.close();
  }
};
