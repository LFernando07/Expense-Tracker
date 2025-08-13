import type React from "react";
import { useState } from "react";

import { toast } from "sonner";
import { Navbar } from "../components/layout/NavBar";
import "../styles/ProfilePage.css";

import { useAppSelector, useAppDispatch } from "../hooks/store";
import { performLogout } from "../store/thunks/auth.thunks";
import { updatedUser } from "../store/thunks/user.thunks";
import { updateUserInfo } from "../store/slices/authSlice";

const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(performLogout());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes implementar lógica de actualización con un thunk o llamada a API
    // console.log("updated data", formData);
    try {
      // Actulizacion de la base de datos
      await dispatch(updatedUser(formData));

      // Actualizacion del usuario en estado local
      dispatch(updateUserInfo(formData));
      toast.success("Información actualizada correctamente!");
    } catch {
      toast.error("Oups! ocurrio un error al actualizar...");
    }
  };

  return (
    <>
      <Navbar isMenuOpen={false} />
      <div className="profile-container">
        <h1>Información del Usuario</h1>
        <div className="space-lock" style={{ display: "flex" }}>
          <input
            type="checkbox"
            id="inpLock"
            onClick={() => setIsEditing(!isEditing)}
          />
          <label htmlFor="inpLock" className="btn-lock">
            <svg width="36" height="40" viewBox="0 0 36 40">
              <path
                className="lockb"
                d="M27 27C27 34.1797 21.1797 40 14 40C6.8203 40 1 34.1797 1 27C1 19.8203 6.8203 14 14 14C21.1797 14 27 19.8203 27 27ZM15.6298 26.5191C16.4544 25.9845 17 25.056 17 24C17 22.3431 15.6569 21 14 21C12.3431 21 11 22.3431 11 24C11 25.056 11.5456 25.9845 12.3702 26.5191L11 32H17L15.6298 26.5191Z"
              ></path>
              <path
                className="lock"
                d="M6 21V10C6 5.58172 9.58172 2 14 2V2C18.4183 2 22 5.58172 22 10V21"
              ></path>
              <path className="bling" d="M29 20L31 22"></path>
              <path className="bling" d="M31.5 15H34.5"></path>
              <path className="bling" d="M29 10L31 8"></path>
            </svg>
            <p className="txt-edit">Editar</p>
          </label>
        </div>

        <form className="profile-form" onSubmit={handleUpdate}>
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />

          {isEditing && (
            <button type="submit" className="save-button">
              Guardar cambios
            </button>
          )}
        </form>

        <form onSubmit={handleLogout}>
          <button type="submit" className="logout-button">
            Cerrar sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
