module.exports = class CRUDProducts {
  async create(db, product) {
    if (
      product.name &&
      product.description &&
      product.photo &&
      product.price &&
      product.stock
    ) {
      const insertProduct = await db.add({
        name: product.name,
        description: product.description,
        photo: product.photo,
        price: product.price,
        stock: product.stock,
      });
      return console.log(insertProduct);
    } else {
      return console.log(
        "El producto ingresado no es correcto,vuelve a ingresarlo nuevamente."
      );
    }
  }

  async find(db) {
    const products = await db.get();
    products.forEach((product) =>
      console.log({ id: product.id, ...product.data() })
    );
  }

  async update(db, product, updateProduct) {
    const update = await db.doc(product).update(updateProduct);
    return console.log(update);
  }

  async delete(db, product) {
    const deleteProduct = await db.doc(product).delete();
    return console.log(deleteProduct);
  }
};
