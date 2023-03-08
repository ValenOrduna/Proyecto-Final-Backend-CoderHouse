import express from "express";
import Product from "../../models/Product.js";
import User from "../../models/User.js";
import Carts from "../../models/Cart.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  const cleanProducts = [];
  products.forEach((product) => {
    const newProduct = {
      id: product._id,
      image: product.image,
      title: product.title,
      description: product.description,
      stock: product.stock,
      price: product.price,
    };
    cleanProducts.push(newProduct);
  });
  const user = await User.findById(req.session.passport.user);
  const cart = await Carts.findById(user.idCart);
  res.render("home", {
    title: "Curso CoderHouse Backend | Home",
    products: cleanProducts,
    avatar: user.avatar,
    countCart: cart.products.length,
  });
});

export default router;
