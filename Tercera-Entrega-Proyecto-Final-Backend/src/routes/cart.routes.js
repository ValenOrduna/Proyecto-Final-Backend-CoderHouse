import express from "express";
import {
  getCart,
  addProduct,
  makeOrder,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("", getCart);

router.post("/addProduct", addProduct);

router.get("/makeOrder", makeOrder);

export default router;
