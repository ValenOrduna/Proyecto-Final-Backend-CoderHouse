module.exports = class CRUDProducts {
  async create(db, product) {
    if (
      product.name &&
      product.description &&
      product.photo &&
      product.price &&
      product.stock
    ) {
      const insertProduct = await db.insertOne(product);
      return console.log(insertProduct);
    } else {
      return console.log(
        "El producto ingresado no es correcto,vuelve a ingresarlo nuevamente."
      );
    }
  }

  async find(db) {
    const products = await db.find().toArray();
    return console.log(products);
  }

  async update(db, product, updateProduct) {
    if (
      (product.name ||
        product.description ||
        product.photo ||
        product.price ||
        product.stock) &&
      (updateProduct.name ||
        updateProduct.description ||
        updateProduct.photo ||
        updateProduct.price ||
        updateProduct.stock)
    ) {
      const update = await db.updateOne(product, { $set: updateProduct });
      return console.log(update);
    } else {
      return console.log(
        "El producto ingresado no es correcto, vuelve a ingresarlo nuevamente."
      );
    }
  }

  async delete(db, product) {
    if (
      product.name ||
      product.description ||
      product.photo ||
      product.price ||
      product.stock
    ) {
      const deleteProduct = await db.deleteOne(product);
      return console.log(deleteProduct);
    } else {
      return console.log(
        "El producto ingresado no fue encontrado, ingrese uno nuevamente."
      );
    }
  }
};
