import express from "express";
import Product from "../../models/Product.js";

const router = express.Router();

router.get("", (req, res) => {
  res.render("products", { title: "Curso CoderHouse Backend | Productos" });
});

router.post("", async (req, res) => {
  const { title, description, price, stock, image } = req.body;
  const newProduct = await Product.create({
    image,
    title,
    description,
    stock,
    price,
  });

  console.log(newProduct);

  if (newProduct) {
    res.status(200).json({ succes: "Producto añadido con exito" });
  } else {
    res.status(404).json({ error: "No se ha podido añadir el producto" });
  }
});

export default router;
