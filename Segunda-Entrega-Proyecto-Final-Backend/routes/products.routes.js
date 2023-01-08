import express from "express";
import {
  readProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", readProducts);

router.get("/:id", findProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
