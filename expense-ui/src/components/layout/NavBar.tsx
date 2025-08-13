import { Link } from "react-router";
import "../../styles/Navbar.css";
import type React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { performLogout } from "../../store/thunks/auth.thunks";

interface Props {
  isMenuOpen: boolean;
}

export const Navbar: React.FC<Props> = ({ isMenuOpen }) => {
  const { isAuth } = useAppSelector((state) => state.authReducer);

  const dispatch = useAppDispatch();

  const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(performLogout());
  };
  return !isAuth ? (
    <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
      <a href="#features" className="nav-link">
        Características
      </a>
      <a href="#benefits" className="nav-link">
        Beneficios
      </a>
      <a href="#testimonials" className="nav-link">
        Testimonios
      </a>
      <button className="btn btn-primary">
        <Link className="btnLink" to={"/login"}>
          Iniciar Sesión
        </Link>
      </button>
      <button className="btn btn-primary">
        <Link className="btnLink" to={"/register"}>
          Crear Cuenta
        </Link>
      </button>
    </nav>
  ) : (
    <nav
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginBlock: "8px",
        paddingRight: "10px",
      }}
    >
      <form onSubmit={handleLogout} style={{ display: "flex", gap: "12px" }}>
        <button className="btn btn-primary">
          <Link className="btnLink" to={"/dashboard"}>
            Ir a Dashboard
          </Link>
        </button>
        <button className="btn btn-primary" type="submit">
          Cerrar sesion
        </button>
      </form>
    </nav>
  );
};
