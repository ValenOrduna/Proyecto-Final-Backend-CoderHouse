import { ObjectID } from "bson";

class CRUDCart {
  constructor() {
    this.cartLength = 0;
  }

  async create(db) {
    const cart = await db.insertOne({
      timestamp: Date.now(),
      products: [],
    });
    return { operacion: "Carrito creado con exito.", carrito: cart };
  }

  async read(db, idCart) {
    const cart = await db.findOne({ _id: ObjectID(idCart) });
    if (cart) {
      return {
        operacion: "Se ha encontrado el carrito con exito",
        carrito: cart.products,
      };
    } else {
      return {
        error:
          "No se ha encontrado el carrito, vuelve a intentarlo nuevamente.",
      };
    }
  }

  async delete(db, idCart) {
    const deleteCart = await db.deleteOne({ _id: ObjectID(idCart) });
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
      const cart = await db.findOne({ _id: ObjectID(idCart) });
      product = {
        ...product,
        id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
      };
      const products = { products: [...cart.products, product] };
      const update = await db.updateOne(
        { _id: ObjectID(idCart) },
        { $set: products }
      );
      return {
        operacion: "Se ha insertado el producto en el carrito con exito",
        carrito: update,
        id: product.id,
      };
    } else {
      return console.log(
        "El producto ingresado no es correcto, vuelve a ingresarlo nuevamente."
      );
    }
  }

  async deleteProduct(db, idCart, idProduct) {
    const cart = await db.findOne({ _id: ObjectID(idCart) });
    const products = cart.products;
    const findProduct = products.find((product) => product.id == idProduct);
    if (findProduct) {
      const updateProducts = products.filter(
        (product) => product.id != idProduct
      );
      const newProducts = { products: updateProducts };
      const update = await db.updateOne(
        { _id: ObjectID(idCart) },
        { $set: newProducts }
      );
      return {
        operacion: "Se ha eliminado el producto del carrito con exito",
        carrito: update,
      };
    } else {
      return {
        error:
          "El carrito o producto ingresado no es correcto, vuelve a ingresarlo nuevamente.",
      };
    }
  }
}

export default CRUDCart;
