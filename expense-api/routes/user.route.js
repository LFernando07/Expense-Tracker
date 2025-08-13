import express from "express";

import {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export const userRoute = () => {
  // Construir el router
  const router = express.Router();

  router.post("/", addUser);
  // Agregar middleware de autenticacion para proteger las rutas
  router.get("/:id", authMiddleware, getUser);
  router.put("/", authMiddleware, updateUser);
  router.delete("/:id", authMiddleware, deleteUser);

  return router;
};
