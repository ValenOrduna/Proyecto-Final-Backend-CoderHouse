import ProductDAO from "../persistence/daos/ProductDAO.js";
import logger from "../../utils/logger.js";

const products = (req, res) => {
  res.render("products", { title: "Curso CoderHouse Backend | Productos" });
};

const addProduct = async (req, res) => {
  const { title, description, price, stock, image } = req.body;
  const newProduct = await ProductDAO.create({
    image,
    title,
    description,
    stock,
    price,
  });

  if (newProduct) {
    res.status(200).json({ succes: "Producto añadido con exito" });
  } else {
    logger.error("No se encontro el producto");
    res.status(404).json({ error: "No se ha podido añadir el producto" });
  }
};

export { products, addProduct };
