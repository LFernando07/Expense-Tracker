import React from "react";
import type { EXPENSE_FILTERS } from "./consts";

// Si quieres extender funcionalidades del Array
declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}

export interface PrivateRouteProps {
  children: React.ReactNode;
}

export type ExpenseId = {
  id: number;
};

export interface Expense {
  id: ExpenseId;
  title: string;
  description?: string;
  amount: number;
  category: string;
  date: Date | undefined; // Formato ISO
  isDelete: boolean;
}

export type UserId = {
  id: number;
};

export interface User {
  id: UserId;
  name: string;
  username: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: Omit<User, "password">;
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
  loading: boolean;
}

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
}

// Accedemos al tipo de la key de tipo del TODO_FILTERS
// El typeof
export type FilterValue =
  (typeof EXPENSE_FILTERS)[keyof typeof EXPENSE_FILTERS];
