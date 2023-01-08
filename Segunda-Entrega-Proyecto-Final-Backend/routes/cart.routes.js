import express from "express";
import {
  createCart,
  findCart,
  insertProduct,
  deleteCart,
  deleteProductCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:id/productos", findCart);

router.post("/", createCart);

router.post("/:id/productos", insertProduct);

router.delete("/:id", deleteCart);

router.delete("/:idcart/productos/:idproduct", deleteProductCart);

export default router;
