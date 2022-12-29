const Product = require("./classes/products/products");
const mongo = require("./daos/DAOSMongo");
const firebase = require("./daos/DAOSFirebase");

const product = new Product(
  "Monitor 25 pulgadas",
  "El mejor monitor",
  "www.imagen.com",
  50000,
  10
);

const product2 = new Product(
  "Escritorio",
  "El mejor escritorio",
  "www.imagen.com",
  100000,
  5
);

// ---------- COLECCION PRODUCTOS ---------- //

// METODO PARA INSERTAR PRODUCTO A LA BASE DE DATOS

// mongo.createProduct(product);

// firebase.createProduct(product2);

// METODO PARA LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS

// mongo.readProducts();

// firebase.readProducts();

// METODO PARA ACTUALIZAR UN PRODUCTO DE LA BASE DE DATOS

// mongo.updateProduct({ name: "Monitor 25 pulgadas" }, { price: 1000 });

// firebase.updateProduct(idProduct, { price: 10000 });

// METODO PARA ELIMINAR PRODUCTO DE LA BASE DE DATOS

// mongo.deleteProduct({ name: "Monitor 25 pulgadas" });

// firebase.deleteProduct(idProduct);

// ---------- COLECCION CARRITO ---------- //

// METODO PARA CREAR UN CARRITO EN LA BASE DE DATOS

// mongo.createCart();

// firebase.createCart();

// METODO PARA INSERTAR PRODUCTO EN CARRITO

// mongo.insertProductCart(1, product);

// firebase.insertProductCart(idCart, product2);

// METODO PARA LEER LOS PRODUCTOS DEL CARRITO

// mongo.readProductsCart(1);

// firebase.readProductsCart(idCart);

// METODO PARA ELIMINAR PRODUCTO DEL CARRITO

// mongo.deleteProductCart(1, "Escritorio");

// firebase.deleteCart(idCart, "Escritorio");

// METODO PARA ELIMINAR CARRITO

// mongo.deleteCart(1);

// firebase.deleteCart(idCart);

// METODO PARA CERRAR EL CLIENTE MONGODB

// mongo.closeClient();
