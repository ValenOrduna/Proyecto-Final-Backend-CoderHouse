import { MongoClient } from "mongodb";
import CRUDProducts from "./CRUDProducts.js";
import CRUDCart from "./CRUDCart.js";

const CrudProducts = new CRUDProducts();
const CrudCart = new CRUDCart();

class Mongo {
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

  deleteCart(idCart) {
    return CrudCart.delete(this.dbCart, idCart);
  }

  insertProductCart(idCart, product) {
    return CrudCart.insertProduct(this.dbCart, idCart, product);
  }

  deleteProductCart(idCart, idProduct) {
    return CrudCart.deleteProduct(this.dbCart, idCart, idProduct);
  }

  async closeClient() {
    await this.client.close();
  }
}

export default Mongo;
