class CRUDCart {
  async create(db) {
    this.cartLength += 1;
    const cart = await db.add({
      timestamp: Date.now(),
      products: [],
    });
    return { operacion: "Carrito creado con exito.", carrito: cart };
  }

  async read(db, idCart) {
    const cart = await db.doc(idCart).get();
    if (cart) {
      return {
        operacion: "Se ha encontrado el carrito con exito",
        carrito: cart.data().products,
      };
    } else {
      return {
        error:
          "No se ha encontrado el carrito, vuelve a intentarlo nuevamente.",
      };
    }
  }

  async delete(db, id) {
    const deleteCart = await db.doc(id).delete();
    if (deleteCart) {
      return {
        operacion: "Se ha eliminado el carrito con exito",
        carrito: deleteCart,
      };
    } else {
      return {
        error:
          "No se ha encontrado el carrito, vuelve a intentarlo nuevamente.",
      };
    }
  }

  async insertProduct(db, idCart, product) {
    if (
      product.name &&
      product.description &&
      product.photo &&
      product.price &&
      product.stock
    ) {
      const cart = await db.doc(idCart).get();
      const productClean = {
        id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        name: product.name,
        description: product.description,
        photo: product.photo,
        price: product.price,
        stock: product.stock,
      };
      const products = { products: [...cart.data().products, productClean] };
      const update = await db.doc(idCart).update(products);
      return {
        operacion: "Se ha insertado el producto en el carrito con exito",
        carrito: update,
        id: productClean.id,
      };
    } else {
      return {
        error:
          "El producto ingresado no es correcto, vuelve a ingresarlo nuevamente.",
      };
    }
  }

  async deleteProduct(db, idCart, idProduct) {
    const cart = await db.doc(idCart).get();
    const products = cart.data().products;
    const findProduct = products.find((product) => product.id == idProduct);
    if (findProduct) {
      const updateProducts = products.filter(
        (product) => product.id != idProduct
      );
      const newProducts = { products: updateProducts };
      const update = await db.doc(idCart).update(newProducts);
      return {
        operacion: "Se ha eliminado el producto del carrito con exito",
        carrito: update,
        id: findProduct.id,
      };
    } else {
      return {
        error:
          "El carrito o el producto ingresado no es correcto, vuelve a ingresarlo nuevamente.",
      };
    }
  }
}

export default CRUDCart;
