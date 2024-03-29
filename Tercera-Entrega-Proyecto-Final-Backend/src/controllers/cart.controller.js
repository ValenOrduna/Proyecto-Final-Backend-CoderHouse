import UserDAO from "../persistence/DAOS/UserDAO.js";
import ProductDAO from "../persistence/daos/ProductDAO.js";
import CartDAO from "../persistence/daos/CartDAO.js";
import { sendEmailOrder } from "../helpers/sendEmail.js";
import sendMessage from "../helpers/sendMessagePhone.js";

const getCart = async (req, res) => {
  const user = await UserDAO.find(req.session.passport.user);
  const cart = await CartDAO.find(user.idCart);
  const totalProducts = await ProductDAO.findAll();
  const productsCart = [];
  await cart.products.map(async (product) => {
    const findProduct = totalProducts.find(
      (totalProducts) => totalProducts.id === product.id
    );
    const newProduct = {
      image: findProduct.image,
      title: findProduct.title,
      price: findProduct.price,
      quantity: product.quantity,
    };
    productsCart.push(newProduct);
  });
  res.render("cart", {
    title: "Curso CoderHouse Backend | Cart",
    products: productsCart,
  });
};

const addProduct = async (req, res) => {
  const user = await UserDAO.find(req.session.passport.user);
  const cart = await CartDAO.find(user.idCart);
  const findProduct = cart.products.find(
    (product) => product.id === req.body.id
  );
  if (findProduct) {
    findProduct.quantity += 1;
    await CartDAO.update({ _id: cart._id }, { products: cart.products });
    return res
      .status(200)
      .json({ success: "Product Added", countCart: cart.products.length });
  }
  const newProducts = [...cart.products, { id: req.body.id, quantity: 1 }];
  await CartDAO.update(cart.id, { products: newProducts });
  return res
    .status(200)
    .json({ success: "Product Added", countCart: newProducts.length });
};

const makeOrder = async (req, res) => {
  const user = await UserDAO.find(req.session.passport.user);
  const cart = await CartDAO.find(user.idCart);
  const totalProducts = await ProductDAO.findAll();
  const productsCart = [];
  await cart.products.map(async (product) => {
    const findProduct = totalProducts.find(
      (totalProducts) => totalProducts.id === product.id
    );
    const newProduct = {
      title: findProduct.title,
      price: findProduct.price,
      quantity: product.quantity,
    };
    await ProductDAO.update(product.id, {
      stock: findProduct.stock - product.quantity,
    });
    productsCart.push(newProduct);
  });

  const order = {
    username: user.username,
    email: user.email,
    products: productsCart,
  };
  const sendEmail = await sendEmailOrder(order);
  await sendMessage({
    phoneSms: user.phone,
    phoneWpp: "+5493329636671",
    messageWpp: sendEmail,
  });
  await CartDAO.update(cart.id, { products: [] });
  return res.status(200).json({ success: "Order successfully!" });
};

export { getCart, addProduct, makeOrder };
