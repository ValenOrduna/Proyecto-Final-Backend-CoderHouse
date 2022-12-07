const express = require("express");
const classProduct = require("../classes/productsClass.js");
const ProductsClass = new classProduct();
const router = express.Router();

const admin = true;

router.get("/:id", (req, res) => {
  const product = ProductsClass.find(req.params.id);
  if (product) {
    res.send({ message: "Producto encontrado con exito", product });
  } else {
    res.send({ error: 0, description: "Producto no encontrado" });
  }
});

router.post("/", (req, res) => {
  const product = ProductsClass.create(req.body);
  if (admin) {
    if (product) {
      res.send({
        message: "Producto agregado con exito",
        product: product,
      });
    } else {
      res.send({
        error: 0,
        description: "El producto ingresado no es correcto",
      });
    }
  } else {
    res.send({ error: -1, description: "Ruta no Autorizada" });
  }
});

router.put("/:id", (req, res) => {
  const updateProducts = ProductsClass.update(Number(req.params.id), req.body);
  if (admin) {
    if (updateProducts) {
      products = updateProducts;
      res.send({
        message: "Producto actualizado con exito",
        id: req.params.id,
        products: products,
      });
    } else {
      res.send({ error: 0, description: "Producto no encontrado" });
    }
  } else {
    res.send({ error: -1, description: "Ruta no Autorizada" });
  }
});

router.delete("/:id", (req, res) => {
  const updateProducts = ProductsClass.delete(Number(req.params.id));
  if (admin) {
    if (updateProducts) {
      products = updateProducts;
      res.send({
        message: "Producto eliminado con exito",
        id: req.params.id,
        products: products,
      });
    } else {
      res.send({ error: 0, description: "Producto no encontrado" });
    }
  } else {
    res.send({ error: -1, description: "Ruta no Autorizada" });
  }
});
module.exports = router;
