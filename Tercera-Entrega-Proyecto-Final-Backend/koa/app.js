import Koa from "koa";
import bodyParser from "koa-bodyparser";
import routerUser from "./routes/user.routes.js";
import routerProduct from "./routes/product.routes.js";

const app = new Koa();

app.use(bodyParser());
app.use(routerUser.routes());
app.use(routerUser.allowedMethods());
app.use(routerProduct.routes());
app.use(routerProduct.allowedMethods());

const PORT = 8080;

app.listen(PORT, () => {
  console.log("La aplicación está corriendo en el puerto 8080");
});
