import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../service/api";

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authAPI.profile();
      return res;
    } catch {
      return rejectWithValue("Unauthorized");
    }
  }
);

export const performLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authAPI.logout();
      return res.message;
    } catch {
      return rejectWithValue("Logout failed");
    }
  }
);
