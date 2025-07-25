import express from "express";
import authMiddleware from "../middlewares/authCors.js";
import {
  addExpense,
  deleteExpenseById,
  getExpenseById,
  listExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";

export const expenseRoute = () => {
  // Construir el router
  const router = express.Router();

  // Agregar middleware de autenticacion para proteger las rutas
  router.use(authMiddleware);

  router.get("/", listExpenses);
  router.get("/:id", getExpenseById);
  router.post("/", addExpense);
  router.put("/:id", updateExpense);
  router.delete("/:id", deleteExpenseById);

  return router;
};
