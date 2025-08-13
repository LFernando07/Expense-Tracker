import type React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import "../styles/RegisterPage.css";
import { createdUser } from "../store/thunks/user.thunks";

const RegisterPage: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Control de errores
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Por favor llena todos los campos");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Deben coincidir las contraseñas");
      return;
    }

    // Creamos al usuario con los datos del formulario
    try {
      // register logic
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...dataToSend } = formData;
      // console.log("Form submitted:", dataToSend);

      dispatch(createdUser(dataToSend));
      toast.success("Cuenta creada exitosamente!!");

      //Limpiamos el formulario
      setFormData({
        email: "",
        password: "",
        name: "",
        username: "",
        confirmPassword: "",
      });

      // Redirigimos al login
      navigate("/");
    } catch (error) {
      // Aquí podrías manejar errores, como mostrar un mensaje al usuario
      console.error("Error al crear el usuario:", error);
    }
  };

  return isAuth ? (
    <Navigate to={"/dashboard"} replace />
  ) : (
    <div className="registerContainer">
      <div className="botones-register">
        <Link className="registerLink" to={"/"}>
          <ArrowLeft className="btn-icon" />
          <p className="text-link">Home</p>
        </Link>
        <Link className="registerLink" to={"/login"}>
          <p className="text-link">Iniciar Sesion</p>
          <ArrowRight className="btn-icon" />
        </Link>
      </div>
      <h3 className="header-title">Crear Cuenta</h3>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="nameContainer">
          <label className="header-text" htmlFor="name">
            Nombre completo:
          </label>
          <input
            className="content"
            type="text"
            name="name"
            id="name"
            placeholder="Nombre(s) Apellido(s)"
            onChange={handleChange}
          />
        </div>
        <div className="usernameContainer">
          <label className="header-text" htmlFor="username">
            Nombre de usuario:
          </label>
          <input
            className="content"
            type="text"
            name="username"
            id="username"
            placeholder="user123"
            onChange={handleChange}
          />
        </div>
        <div className="emailContainer">
          <label className="header-text" htmlFor="email">
            Email:
          </label>
          <input
            className="content"
            type="text"
            name="email"
            id="email"
            placeholder="ejemplo@gmail.com"
            onChange={handleChange}
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
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
          />
        </div>
        <div className="confirmPasswordContainer">
          <label className="header-text" htmlFor="confirmPassword">
            Confirmar contraseña:
          </label>
          <input
            className="content"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Ingresa de nuevo tu contraseña"
            onChange={handleChange}
          />
        </div>
        <button className="btn-register" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
