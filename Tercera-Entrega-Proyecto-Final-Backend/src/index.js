import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import { engine } from "express-handlebars";
import cluster from "cluster";
import routerHome from "./routes/home.routes.js";
import routerRegister from "./routes/register.routes.js";
import routerLogin from "./routes/login.routes.js";
import routerProfile from "./routes/profile.routes.js";
import routerCart from "./routes/cart.routes.js";
import routerProducts from "./routes/products.routes.js";
import upload from "./helpers/uploadImages.js";
import { initializePassport } from "../passport/passport.config.js";
import getConfigSession from "./persistence/factories/SessionFactory.js";
import connectDb from "./persistence/factories/DBFactory.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 8080;

const MODE = "CLUSTER";

if (MODE === "CLUSTER") {
  if (cluster.isPrimary) {
    for (let i = 0; i < 4; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} exit`);
      cluster.fork();
    });
  } else {
    app.listen(PORT, () =>
      console.log(`El servidor esta escuchando en el puerto ${PORT}`)
    );
  }
} else {
  app.listen(PORT, () =>
    console.log(`El servidor esta escuchando en el puerto ${PORT}`)
  );
}

const db = connectDb();

const configSession = getConfigSession(db);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(configSession);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(upload.single("image"));

app.use("/home", routerHome);
app.use("/register", routerRegister);
app.use("/login", routerLogin);
app.use("/profile", routerProfile);
app.use("/cart", routerCart);
app.use("/api/productos", routerProducts);
