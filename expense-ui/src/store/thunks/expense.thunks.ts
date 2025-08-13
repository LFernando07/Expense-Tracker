import { createAsyncThunk } from "@reduxjs/toolkit";
import { expensesAPI } from "../../service/api";
import type { Expense, ExpenseId } from "../../types";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await expensesAPI.getAll();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createExpense = createAsyncThunk(
  "expense/createExpense",
  async (data: Omit<Expense, "id" | "isDelete">, { rejectWithValue }) => {
    try {
      const res = await expensesAPI.create({
        ...data,
      });
      return res.expense;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async (
    { id, data }: { id: ExpenseId; data: Partial<Expense> },
    { rejectWithValue }
  ) => {
    try {
      const res = await expensesAPI.update(id, data);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const softDeleteExpense = createAsyncThunk(
  "expense/removeExpense",
  async (
    { id, index }: { id: ExpenseId; index: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await expensesAPI.delete(id);
      console.log(res.status);
      if (res.status == 204) return { idx: index, value: true };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
