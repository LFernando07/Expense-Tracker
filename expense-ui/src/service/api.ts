// src/api/api.ts
import axios from "axios";
import type {
  AuthResponse,
  Expense,
  ExpenseId,
  LoginData,
  RegisterData,
  RegisterResponse,
  User,
} from "../types";

const baseURL = "http://localhost:1234/api";

const API = axios.create({
  baseURL: "http://localhost:1234/api",
  withCredentials: true, // <- necesario para cookies httpOnly
});

export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const res = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Login failed");
    return await res.json();
  },

  profile: async (): Promise<AuthResponse> => {
    const res = await fetch(`${baseURL}/auth/profile`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Not authenticated");
    return await res.json();
  },

  logout: async (): Promise<{ message: string }> => {
    const res = await fetch(`${baseURL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
    return await res.json();
  },
};

export const userAPI = {
  create: async (data: RegisterData): Promise<RegisterResponse> => {
    const res = await fetch(`${baseURL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Register failed");
    return await res.json();
  },

  update: async (data: Partial<User>): Promise<User> => {
    const res = await fetch(`${baseURL}/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 👈 esto es necesario para cookies
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("updated user failed");
    return await res.json();
  },
};

export const expensesAPI = {
  getAll: async (): Promise<{ expenses: Expense[] }> => {
    const res = await fetch(`${baseURL}/expenses`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Not found expenses");
    return { expenses: await res.json() };
  },

  getExpense: async (id: ExpenseId): Promise<{ expense: Expense }> => {
    const res = await fetch(`${baseURL}/expenses/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Not found expenses");
    return { expense: await res.json() };
  },

  create: async (
    expense: Omit<Expense, "id" | "isDelete">
  ): Promise<{ expense: Expense }> => {
    const res = await fetch(`${baseURL}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error("Not found expenses");
    return { expense: await res.json() };
  },

  update: async (id: ExpenseId, data: Partial<Expense>): Promise<Expense> => {
    const res = await fetch(`${baseURL}/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 👈 esto es necesario para cookies
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("updated expense failed");
    return await res.json();
  },

  delete: (id: ExpenseId) => API.delete(`/expenses/${id}`),
};
