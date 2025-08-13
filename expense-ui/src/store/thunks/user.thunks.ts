import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterData, User } from "../../types";
import { userAPI } from "../../service/api";

export const createdUser = createAsyncThunk(
  "user/createdUser",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const res = await userAPI.create({
        ...data,
      });
      return res.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatedUser = createAsyncThunk(
  "user/updatedUser",
  async (data: Omit<User, "id">, { rejectWithValue }) => {
    try {
      const res = await userAPI.update({ ...data });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
