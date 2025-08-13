import type React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

import { toast } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react";
import dollarSVG from "../assets/expense-img.png";

import { useAppDispatch, useAppSelector } from "../hooks/store";
import { authAPI } from "../service/api";
import { login } from "../store/slices/authSlice";
import { type LoginData } from "../types";
import { useCookies } from "react-cookie";
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const [, setCookie] = useCookies(["access_token"]);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      toast.error("Por favor llena todos los campos");
      return;
    }

    try {
      const res = await authAPI.login(formData);
      // Actualizamos el estado de autenticacion
      dispatch(login(res.user));

      setCookie("access_token", res.token, {
        path: "/",
        maxAge: 60 * 60,
        sameSite: "lax",
      });
      navigate("/dashboard");

      toast.success("¡Bienvenido! Sesión iniciada correctamente"); // ✅ Toast de éxito
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage =
        err?.data?.error ||
        err?.data?.message ||
        "Error al iniciar sesión. Verifica tus credenciales.";

      setError(errorMessage);
      toast.error(errorMessage); // ✅ También mostrar en toast
    }
  };

  return isAuth ? (
    <Navigate to={"/dashboard"} replace />
  ) : (
    <div className="loginContainer">
      <h3 className="header-title">Iniciar Sesion</h3>
      <div className="index-img-container">
        <img className="index-img" src={dollarSVG} alt="imagen emcimada" />
      </div>

      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "6px",
            color: "#c33",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="emailContainer">
          <label className="header-text" htmlFor="email">
            Email:
          </label>
          <input
            className="content"
            type="email" // ✅ Cambiar a type="email" para mejor validación
            name="email"
            id="email"
            value={formData.email} // ✅ Agregar value controlado
            placeholder="ejemplo@gmail.com"
            onChange={handleChange}
            required
          />
        </div>

        <div className="passwordContainer">
          <label className="header-text" htmlFor="password">
            Contraseña:
          </label>
          <input
            className="content"
            type="password"
            name="password"
            id="password"
            value={formData.password} // ✅ Agregar value controlado
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn-login" type="submit">
          Ingresar
        </button>

        <div className="botones">
          <Link className="loginLink" to={"/"}>
            <ArrowLeft className="btn-icon" />
            <p className="text-link">Home</p>
          </Link>
          <Link className="loginLink" to={"/register"}>
            <p className="text-link">Crear cuenta</p>
            <ArrowRight className="btn-icon" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
