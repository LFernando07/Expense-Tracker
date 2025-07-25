import express from "express";
import authMiddleware from "../middlewares/authCors.js";
import { login, logout, profile } from "../controllers/auth.controller.js";

export const authRoute = () => {
  // Construir el router
  const router = express.Router();

  router.post("/login", login);
  router.post("/logout", logout);
  // Agregar middleware de autenticacion para proteger las rutas
  router.get("/profile", authMiddleware, profile);

  return router;
};
