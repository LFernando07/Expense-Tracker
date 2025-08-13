import express from "express";
import {
  addExpense,
  deleteExpenseById,
  getExpenseById,
  listExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export const expenseRoute = () => {
  // Construir el router
  const router = express.Router();

  // Agregar middleware de autenticacion para proteger las rutas
  router.get("/", authMiddleware, listExpenses);
  router.get("/:id", authMiddleware, getExpenseById);
  router.post("/", authMiddleware, addExpense);
  router.put("/:id", authMiddleware, updateExpense);
  router.delete("/:id", authMiddleware, deleteExpenseById);

  return router;
};
