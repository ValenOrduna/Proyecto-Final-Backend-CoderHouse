import db from "../daos/DAOS.js";

const createCart = (req, res) => {
  const cart = db().createCart();
  cart.then((result) => res.status(200).json(result));
};

const findCart = (req, res) => {
  const cart = db().readProductsCart(req.params.id);
  cart.then((result) => res.status(200).json(result));
};

const insertProduct = (req, res) => {
  const cart = db().insertProductCart(req.params.id, req.body);
  cart.then((result) => res.status(200).json(result));
};

const deleteCart = (req, res) => {
  const cart = db().deleteCart(req.params.id);
  cart.then((result) => res.status(200).json(result));
};

const deleteProductCart = (req, res) => {
  const cart = db().deleteProductCart(req.params.idcart, req.params.idproduct);
  cart.then((result) => res.status(200).json(result));
};

export { createCart, findCart, insertProduct, deleteCart, deleteProductCart };
