import express from "express";
import { products, addProduct } from "../controllers/products.controller.js";
const router = express.Router();

router.get("", products);

router.post("", addProduct);

export default router;
