import express from "express";
import routerProducts from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";

// Inicializamos la app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCart);

const __PORT = process.env.PORT ?? 8080;

app.listen(__PORT, () =>
  console.log(`La app esta escuchando en el puerto ${__PORT}`)
);
