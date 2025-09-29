import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Expense, ExpenseState } from "../../types";
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  softDeleteExpense,
} from "../thunks/expense.thunks";

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    getExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Obtencion de lista de gastos
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
      })
      .addCase(fetchExpenses.rejected, (state) => {
        state.loading = false;
        state.expenses = [];
      })

      // Creacion de un gasto
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload); // Agregamos el nuevo gasto al final
      })
      .addCase(createExpense.rejected, (state) => {
        state.loading = false;
      })

      // Actualización de un gasto
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        const updatedExpense = action.payload;
        const index = state.expenses.findIndex(
          (expense) => expense.id === updatedExpense.id
        );
        if (index !== -1) {
          state.expenses[index] = updatedExpense;
        }
      })
      .addCase(updateExpense.rejected, (state) => {
        state.loading = false;
      })

      // Eliminacion de un gasto
      .addCase(softDeleteExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(softDeleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload?.id;
        const index = state.expenses.findIndex((e) => e.id === id);
        if (index !== -1) {
          state.expenses[index].isDelete = true;
        }
      })
      .addCase(softDeleteExpense.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { getExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
