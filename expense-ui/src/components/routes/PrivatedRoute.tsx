import type React from "react";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../hooks/store";

export const PrivatedRoute: React.FC = () => {
  const { isAuth, loading } = useAppSelector((state) => state.authReducer);

  if (loading) {
    return (
      <div className="loading-container">
        <div>Verificando autenticación...</div>
      </div>
    );
  }

  // ✅ Corregido: redirigir a /login en lugar de /dashboard
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
