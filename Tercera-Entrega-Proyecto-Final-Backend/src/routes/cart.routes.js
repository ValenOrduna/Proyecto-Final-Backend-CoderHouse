import express from "express";
import users from "../../models/User.js";
import carts from "../../models/Cart.js";
const router = express.Router();

router.post("/addProduct", async (req, res) => {
  const user = await users.findById(req.session.passport.user);
  const cart = await carts.findById(user.idCart);
  const findProduct = cart.products.find(
    (product) => product.id === req.body.id
  );
  if (findProduct) {
    findProduct.quantity += 1;
    await carts.updateOne({ _id: cart._id }, { products: cart.products });
    return res
      .status(200)
      .json({ success: "Product Added", countCart: cart.products.length });
  }
  const newProducts = [...cart.products, { id: req.body.id, quantity: 1 }];

  await carts.updateOne({ _id: cart._id }, { products: newProducts });
  return res
    .status(200)
    .json({ success: "Product Added", countCart: newProducts.length });
});

export default router;
