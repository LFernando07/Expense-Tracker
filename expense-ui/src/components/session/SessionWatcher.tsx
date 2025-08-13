import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { logout } from "../../store/slices/authSlice";

export const SessionWatcher: React.FC = () => {
  const { session } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  // auth.expiresAt → número en milisegundos cuando expira el token

  useEffect(() => {
    if (!session?.expiresAt) return;

    const now = Date.now();
    const msBeforeWarning = session.expiresAt - now - 5 * 60 * 1000; // 5 minutos antes
    const msUntilExpiry = session.expiresAt - now;

    let warningTimer: number, expiryTimer: number;

    if (msBeforeWarning > 0) {
      warningTimer = setTimeout(() => {
        toast.warning(
          "⚠️ Tu sesión expirará en 5 minutos. Guarda tu trabajo o vuelve a iniciar sesión."
        );
      }, msBeforeWarning);
    }

    if (msUntilExpiry > 0) {
      expiryTimer = setTimeout(() => {
        Swal.fire({
          title: "Oooups",
          text: "⏳ Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          icon: "error",
        });
        dispatch(logout());
      }, msUntilExpiry);
    }

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(expiryTimer);
    };
  }, [session?.expiresAt, logout]);

  return null; // No renderiza nada, solo maneja la lógica
};
