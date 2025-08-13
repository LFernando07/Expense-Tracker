import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, InfoUser, User } from "../../types";
import { fetchProfile, performLogout } from "../thunks/auth.thunks";
import { createdUser, updatedUser } from "../thunks/user.thunks";

const initialState: AuthState = {
  isAuth: false,
  user: null,
  session: null,
  loading: false, // Cambié de true a false para mejor UX inicial
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Acción manual para login (si la necesitas)
    login: (state, action: PayloadAction<InfoUser>) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.loading = false;
    },

    // Acción manual para logout
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.session = null;
      state.loading = false;
    },

    // Actualizar información del usuario localmente
    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },

    // ✅ AGREGADO: Setear usuario completo (para casos específicos)
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== AUTHENTICATION THUNKS =====
      // Fetch Profile (verificar autenticación)
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.session = action.payload.session;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
        state.session = null;
      })

      // Logout
      .addCase(performLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(performLogout.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(performLogout.rejected, (state) => {
        state.loading = false;
        // En caso de error al hacer logout, mejor limpiar sesión por seguridad
        state.isAuth = false;
        state.user = null;
      })

      // ===== USER MANAGEMENT THUNKS =====

      // Crear usuario (registro)
      .addCase(createdUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createdUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true; // Usuario registrado = autenticado
        state.user = action.payload;
      })
      .addCase(createdUser.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
      })

      // Actualizar usuario
      .addCase(updatedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatedUser.fulfilled, (state, action) => {
        state.loading = false;
        // Mantener autenticación y actualizar datos del usuario
        if (state.user) {
          state.user = {
            ...state.user,
            ...action.payload,
          };
        }
        // Asegurar que sigue autenticado
        state.isAuth = true;
      })
      .addCase(updatedUser.rejected, (state) => {
        state.loading = false;
        // En caso de error al actualizar, mantener el estado actual
        // No cambiar isAuth ni user
      });
  },
});

export const { login, logout, updateUserInfo, setUser } = authSlice.actions;
export default authSlice.reducer;
