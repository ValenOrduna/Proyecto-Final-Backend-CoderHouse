import express from "express";
import Product from "../../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  const cleanProducts = [];
  products.forEach((product) => {
    const newProduct = {
      image: product.image,
      title: product.title,
      description: product.description,
      stock: product.stock,
      price: product.price,
    };
    cleanProducts.push(newProduct);
  });
  res.render("home", {
    title: "Curso CoderHouse Backend | Home",
    products: cleanProducts,
  });
});

export default router;
