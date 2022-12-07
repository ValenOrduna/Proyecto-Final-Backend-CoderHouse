const fs = require("fs");
module.exports = class Cart {
  _UBICATION = "./data/cart.json";
  async create() {
    const cart = await fs.promises.readFile(this._UBICATION, "utf-8");
    let cartClean = JSON.parse(cart);
    const newCart = {
      id: cartClean[cartClean.length - 1].id + 1,
      timestamp: Date.now(),
      products: [],
    };
    cartClean = [...cartClean, newCart];
    await fs.promises.writeFile(
      this._UBICATION,
      JSON.stringify(cartClean, null, 2)
    );
  }
  async delete(id) {
    const cart = await fs.promises.readFile(this._UBICATION, "utf-8");
    let cartClean = JSON.parse(cart);
    const newCarts = cartClean.filter((cart) => cart.id != id);
    await fs.promises.writeFile(
      this._UBICATION,
      JSON.stringify(newCarts, null, 2)
    );
  }
  async insertProduct(id) {
    const products = await fs.promises.readFile(
      "../data/products.json",
      "utf-8"
    );
    let productsClean = JSON.parse(products);
    const findProduct = productsClean.find((product) => product.id === id);
    if (findProduct) {
      const cart = await fs.promises.readFile(this._UBICATION, "utf-8");
      let cartClean = JSON.parse(cart);
    }
  }
};
