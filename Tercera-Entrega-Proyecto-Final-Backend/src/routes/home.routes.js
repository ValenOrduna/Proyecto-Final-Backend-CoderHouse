import express from "express";
import { home, logout } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/", home);

router.get("/logout", logout);

export default router;
