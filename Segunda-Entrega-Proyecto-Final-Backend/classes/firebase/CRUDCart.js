module.exports = class CRUDCart {
  async create(db) {
    this.cartLength += 1;
    const cart = await db.add({
      timestamp: Date.now(),
      products: [],
    });
    return console.log(cart);
  }

  async read(db, id) {
    const cart = await db.doc(id).get();
    return console.log(cart.data().products);
  }

  async delete(db, id) {
    const deleteCart = await db.doc(id).delete();
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
      const cart = await db.doc(id).get();
      const productClean = {
        name: product.name,
        description: product.description,
        photo: product.photo,
        price: product.price,
        stock: product.stock,
      };
      const products = { products: [...cart.data().products, productClean] };
      const update = await db.doc(id).update(products);
      return console.log(update);
    } else {
      return console.log(
        "El producto ingresado no es correcto, vuelve a ingresarlo nuevamente."
      );
    }
  }

  async deleteProduct(db, id, nameProduct) {
    if (nameProduct) {
      const cart = await db.doc(id).get();
      const products = cart.data().products;
      const findProduct = products.find(
        (product) => product.name === nameProduct
      );
      if (findProduct) {
        const updateProducts = products.filter(
          (product) => product.name != nameProduct
        );
        const newProducts = { products: updateProducts };
        const update = await db.doc(id).update(newProducts);
        return console.log(update);
      }
    } else {
      return console.log(
        "El producto ingresado no es correcto, vuelve a ingresarlo nuevamente."
      );
    }
  }
};
