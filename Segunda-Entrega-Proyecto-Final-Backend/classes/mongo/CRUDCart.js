module.exports = class CRUDCart {
  constructor() {
    this.cartLength = 0;
  }

  async create(db) {
    this.cartLength += 1;
    const cart = await db.insertOne({
      _id: this.cartLength,
      timestamp: Date.now(),
      products: [],
    });
    return console.log(cart);
  }

  async read(db, id) {
    const cart = await db.findOne({ _id: id });
    return console.log(cart.products);
  }

  async delete(db, id) {
    const deleteCart = await db.deleteOne({ _id: id });
    return console.log(deleteCart);
  }

  async insertProduct(db, id, product) {
    if (
      product.name &&
      product.description &&
      product.photo &&
      product.price &&
      product.stock
    ) {
      const cart = await db.findOne({ _id: id });
      const products = { products: [...cart.products, product] };
      const update = await db.updateOne({ _id: id }, { $set: products });
      return console.log(update);
    } else {
      return console.log(
        "El producto ingresado no es correcto, vuelve a ingresarlo nuevamente."
      );
    }
  }

  async deleteProduct(db, id, nameProduct) {
    if (nameProduct) {
      const cart = await db.findOne({ _id: id });
      const products = cart.products;
      const findProduct = products.find(
        (product) => product.name === nameProduct
      );
      if (findProduct) {
        const updateProducts = products.filter(
          (product) => product.name != nameProduct
        );
        const newProducts = { products: updateProducts };
        const update = await db.updateOne({ _id: id }, { $set: newProducts });
        return console.log(update);
      }
    } else {
      return console.log(
        "El producto ingresado no es correcto, vuelve a ingresarlo nuevamente."
      );
    }
  }
};
