import {
  MongoProduct,
  MongoUser,
  MongoCart,
} from "../../models/mongoSchema.js";
import logger from "../../utils/logger.js";

const home = async (req, res) => {
  try {
    const products = await MongoProduct.findAll();
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
    const user = await MongoUser.find(req.session.passport.user);
    const cart = await MongoCart.find(user.idCart);
    res.render("home", {
      title: "Curso CoderHouse Backend | Home",
      products: cleanProducts,
      avatar: user.avatar,
      countCart: cart.products.length,
    });
  } catch (err) {
    return res.redirect("/login");
  }
};

const logout = (req, res) => {
  req.session.destroy();
  logger.info("Usuario Logueado Correctamente");
  return res.status(200).json({ success: "Session has been destroyed" });
};

export { home, logout };
