import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
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

mongoose.set("strictQuery", true);

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const configSession = session({
  store: MongoStore.create({
    mongoUrl: process.env.URISESSIONS,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
});

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
