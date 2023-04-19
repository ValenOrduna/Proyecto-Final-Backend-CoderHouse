import Router from "koa-router";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = new Router({
  prefix: "/users",
});

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
