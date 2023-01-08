import db from "../daos/DAOS.js";

const readProducts = (req, res) => {
  const products = db().readProducts();
  products.then((result) => res.status(200).json(result));
};

const createProduct = (req, res) => {
  const product = db().createProduct(req.body);
  product.then((result) => res.status(200).json(result));
};

const findProduct = (req, res) => {
  const product = db().findProduct(req.params.id);
  product.then((result) => res.status(200).json(result));
};

const updateProduct = (req, res) => {
  const updateProduct = db().updateProduct(req.params.id, req.body);
  updateProduct.then((result) => res.status(200).json(result));
};

const deleteProduct = (req, res) => {
  const deleteProduct = db().deleteProduct(req.params.id);
  deleteProduct.then((result) => res.status(200).json(result));
};

export {
  readProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
};
