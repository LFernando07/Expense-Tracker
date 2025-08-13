import {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  modificatedExpense,
} from "../services/expense.service.js";
import handleException from "../common/handle_request.js";
import { Validations } from "../common/common_validations.js";
import { ExpenseValidations } from "../common/validations/expense/expenseValidations.js";

// Obtener gastos
// Se inclute obtenerlos con filtros de fecha
export const listExpenses = handleException(async (req, res) => {
  const userId = parseInt(req.user.id, 10);

  // Validar el ID del usuario
  const validation = Validations.validatedId(userId);
  if (!validation.valid) {
    return res.status(validation.error.status).json(validation.error.message);
  }

  // Obtener parámetros de consulta
  const { range, start, end } = req.query;
  let dateFilter = {};
  const now = new Date();

  // Filtrar por rangos predefinidos
  if (range === "week") {
    dateFilter.date = { gte: new Date(now.setDate(now.getDate() - 7)) };
  } else if (range === "month") {
    dateFilter.date = { gte: new Date(now.setMonth(now.getMonth() - 1)) };
  } else if (range === "3months") {
    dateFilter.date = { gte: new Date(now.setMonth(now.getMonth() - 3)) };
  }

  // Filtrar por rango personalizado
  else if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (!isNaN(startDate) && !isNaN(endDate)) {
      dateFilter.date = {
        gte: startDate,
        lte: endDate,
      };
    } else {
      return res
        .status(400)
        .json({ error: "Invalid date format in 'start' or 'end'" });
    }
  }

  // Obtener gastos filtrados
  try {
    const expenses = await getExpenses(userId, dateFilter);
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Obtener un gasto por id
export const getExpenseById = handleException(async (req, res) => {
  // Obtener el id del gasto
  const expenseId = parseInt(req.params.id, 10);

  if (!Validations.validatedId(expenseId).valid) {
    return res
      .status(Validations.validatedId(expenseId).error.status)
      .json(Validations.validatedId(expenseId).error.message);
  }

  // Obtener el usuario activo
  const userId = parseInt(req.user.id, 10);

  if (!Validations.validatedId(userId).valid) {
    return res
      .status(Validations.validatedId(userId).error.status)
      .json(Validations.validatedId(userId).error.message);
  }

  // Obtener un gasto
  try {
    const expense = await getExpense(expenseId, userId);
    res.json(expense);
  } catch (error) {
    res.status(403).json({ error: "Error fetching expenses" });
  }
});

// Agregar un gasto
export const addExpense = handleException(async (req, res) => {
  // Obtenemos el usuario
  const userId = parseInt(req.user.id, 10);

  if (!Validations.validatedId(userId).valid) {
    return res
      .status(Validations.validatedId(userId).error.status)
      .json(Validations.validatedId(userId).error.message);
  }

  // Obtenemos las propiedades de la peticion
  const { title, description, category, amount, date } = req.body;

  const validBody = ExpenseValidations.checkNotEmptyExpense(
    title,
    category,
    amount,
    date
  );
  if (!validBody.valid) {
    return res.status(validBody.error.status).json(validBody.error.message);
  }

  const validTypeBody = ExpenseValidations.checkTypeOfFields(
    title,
    description,
    category,
    amount
  );
  if (!validTypeBody.valid) {
    return res
      .status(validTypeBody.error.status)
      .json(validTypeBody.error.message);
  }

  // Creamos el nuevo gasto
  const newExpense = await createExpense(userId, {
    title,
    description,
    amount: parseFloat(amount),
    category,
    date,
  });

  res.status(201).json(newExpense);
});

// Actualizar un gasto
export const updateExpense = handleException(async (req, res) => {
  // Obtener el id del gasto
  const expenseId = parseInt(req.params.id, 10);

  if (!Validations.validatedId(expenseId).valid) {
    return res
      .status(Validations.validatedId(expenseId).error.status)
      .json(Validations.validatedId(expenseId).error.message);
  }

  // Obtener el usuario activo
  const userId = parseInt(req.user.id, 10);

  if (!Validations.validatedId(userId).valid) {
    return res
      .status(Validations.validatedId(userId).error.status)
      .json(Validations.validatedId(userId).error.message);
  }

  // Obtenemos las propiedades de la peticion
  const { title, description, category, amount, date } = req.body;

  // Actualizamos un gasto
  try {
    const upExpense = await modificatedExpense(expenseId, userId, {
      title,
      description,
      amount: parseFloat(amount),
      category,
      date,
    });

    res.status(200).json(upExpense);
  } catch (error) {
    res.status(406).json({ error: "Data not content" });
  }
});

// Eliminar un gasto
export const deleteExpenseById = handleException(async (req, res) => {
  // Obtener el id del gasto
  const expenseId = parseInt(req.params.id, 10);

  if (!Validations.validatedId(expenseId).valid) {
    return res
      .status(Validations.validatedId(userId).error.status)
      .json(Validations.validatedId(userId).error.message);
  }

  // Obtener el usuario activo
  const userId = parseInt(req.user.id, 10);

  if (!Validations.validatedId(userId).valid) {
    return res
      .status(Validations.validatedId(userId).error.status)
      .json(Validations.validatedId(userId).error.message);
  }
  try {
    await deleteExpense(expenseId, userId);

    res.status(204).send();
  } catch (error) {
    res.status(406).json({ error: "Failed delete" });
  }
});
