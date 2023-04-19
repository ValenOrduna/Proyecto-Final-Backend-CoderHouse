import ProductDAO from "../../src/persistence/DAOS/ProductDAO.js";

const getProducts = async (ctx) => {
  const products = await ProductDAO.findAll();
  if (!products) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "error",
      message: "No se pudo encontrar ningún producto",
    });
  }

  return (ctx.body = products);
};

const getProductById = async (ctx) => {
  const id = ctx.params.id;
  const product = await ProductDAO.find(id);
  if (!product) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "error",
      message: "No se pudo encontrar el producto solicitado",
    });
  }

  return (ctx.body = product);
};

const createProduct = async (ctx) => {
  const product = ctx.request.body;
  const newProduct = await ProductDAO.create(product);
  if (!newProduct) {
    ctx.response.status = 400;
    return (ctx.body = {
      status: "error",
      message: "No se pudo crear el nuevo producto",
    });
  }

  return (ctx.body = newProduct);
};

const updateProduct = async (ctx) => {
  const id = ctx.params.id;
  const product = ctx.request.body;
  const updatedProduct = await ProductDAO.update(id, product);
  if (!updatedProduct) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "error",
      message: "No se pudo encontrar el producto a actualizar",
    });
  }

  return (ctx.body = updatedProduct);
};

const deleteProduct = async (ctx) => {
  const id = ctx.params.id;
  const deletedProduct = await ProductDAO.delete(id);
  if (!deletedProduct) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "error",
      message: "No se pudo encontrar el producto a eliminar",
    });
  }

  return (ctx.body = {
    status: "success",
    message: "El producto se eliminó correctamente",
  });
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
