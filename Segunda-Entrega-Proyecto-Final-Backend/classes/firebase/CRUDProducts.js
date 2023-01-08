class CRUDProducts {
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
      return {
        operacion: "Has creado el producto exitosamente",
        producto: insertProduct,
      };
    } else {
      return {
        error:
          "El producto ingresado no es correcto,vuelve a ingresarlo nuevamente.",
      };
    }
  }

  async find(db) {
    const products = await db.get();
    let productsClean = [];
    await products.forEach(
      (product) =>
        (productsClean = [
          ...productsClean,
          { id: product.id, ...product.data() },
        ])
    );

    return productsClean;
  }

  async findOne(db, idProduct) {
    const products = await db.get();

    let productClean = "";

    await products.forEach((product) => {
      if (product.id == idProduct) {
        productClean = { id: product.id, ...product.data() };
      }
    });
    if (productClean) {
      return {
        operacion: "Producto encontrado con exito.",
        producto: productClean,
      };
    } else {
      return {
        error:
          "El producto ingresado no existe,vuelve a ingresarlo nuevamente.",
      };
    }
  }

  async update(db, idProduct, updateProduct) {
    const update = await db.doc(idProduct).update(updateProduct);
    if (update) {
      return {
        operacion: "Producto actualizado con exito.",
        producto: update,
      };
    } else {
      return {
        error:
          "El producto ingresado no existe,vuelve a ingresarlo nuevamente.",
      };
    }
  }

  async delete(db, idProduct) {
    const deleteProduct = await db.doc(idProduct).delete();
    if (deleteProduct) {
      return {
        operacion: "Producto eliminado con exito.",
        producto: deleteProduct,
      };
    } else {
      return {
        error:
          "El producto ingresado no existe,vuelve a ingresarlo nuevamente.",
      };
    }
  }
}

export default CRUDProducts;
