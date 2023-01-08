import { ObjectId } from "mongodb";

class CRUDProducts {
  async create(db, product) {
    if (
      product.name &&
      product.description &&
      product.photo &&
      product.price &&
      product.stock
    ) {
      await db.insertOne(product);
      return { operacion: "Producto añadido con exito.", producto: product };
    } else {
      return {
        error:
          "El producto ingresado no es correcto,vuelve a ingresarlo nuevamente.",
      };
    }
  }

  async find(db) {
    const products = await db.find().toArray();
    return products;
  }

  async findOne(db, idProduct) {
    const product = await db.find({ _id: ObjectId(idProduct) }).toArray();
    if (product) {
      return { operacion: "Producto encontrado con exito.", producto: product };
    } else {
      return {
        error:
          "El producto ingresado no existe ,vuelve a ingresarlo nuevamente.",
      };
    }
  }

  async update(db, idProduct, updateProduct) {
    const update = await db.updateOne(
      { _id: ObjectId(idProduct) },
      { $set: updateProduct }
    );
    if (update) {
      return { operacion: "Producto actualizado con exito.", producto: update };
    } else {
      return {
        error:
          "El producto ingresado no es correcto,vuelve a ingresarlo nuevamente.",
      };
    }
  }

  async delete(db, idProduct) {
    const deleteProduct = await db.deleteOne({ _id: ObjectId(idProduct) });

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
