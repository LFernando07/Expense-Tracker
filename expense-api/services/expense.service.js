import { PrismaClient } from "@prisma/client";

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

// Retornar la lista de gastos por usuario
export const getExpenses = async (userId, filter = {}) => {
  const expenses = prisma.expense.findMany({
    where: {
      userId,
      ...filter,
    },
    orderBy: {
      date: "desc",
    },
  });

  return expenses;
};

// Retornar un gasto en especifico
export const getExpense = async (expenseId, userId) => {
  const expense = prisma.expense.findUnique({
    where: {
      id: expenseId,
      userId,
    },
  });

  return expense;
};

// Crear un gasto
export const createExpense = async (userId, data) => {
  return prisma.expense.create({
    data: {
      ...data,
      userId,
    },
  });
};

// Actualizar un gasto
export const modificatedExpense = async (expenseId, userId, data) => {
  return prisma.expense.update({
    data,
    where: { id: expenseId, userId },
  });
};

// Eliminar un gasto -> soft delete
export const deleteExpense = async (expenseId, userId) => {
  return prisma.expense.update({
    data: {
      isDelete: true,
    },
    where: {
      id: expenseId,
      userId,
    },
  });
};
