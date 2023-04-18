import UserDAO from "../persistence/DAOS/UserDAO.js";
import ProductDAO from "../persistence/daos/ProductDAO.js";
import CartDAO from "../persistence/daos/CartDAO.js";
import logger from "../../utils/logger.js";

const home = async (req, res) => {
  try {
    const products = await ProductDAO.findAll();
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
    const user = await UserDAO.find(req.session.passport.user);
    const cart = await CartDAO.find(user.idCart);
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
