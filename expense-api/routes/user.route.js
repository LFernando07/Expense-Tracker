import express from "express";
import authMiddleware from "../middlewares/authCors.js";

import {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

export const userRoute = () => {
  // Construir el router
  const router = express.Router();

  router.post("/", addUser);
  // Agregar middleware de autenticacion para proteger las rutas
  router.get("/:id", authMiddleware, getUser);
  router.put("/:id", authMiddleware, updateUser);
  router.delete("/:id", authMiddleware, deleteUser);

  return router;
};
