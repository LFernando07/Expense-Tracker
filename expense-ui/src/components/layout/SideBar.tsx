import React, { useState } from "react";
import "../../styles/Sidebar.css";
import {
  Menu,
  CircleUserRound,
  CircleDollarSign,
  Plus,
  ListMinus,
  ChevronDown,
  ShieldUser,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { performLogout } from "../../store/thunks/auth.thunks";
import { Link } from "react-router";
import { ExpenseDrawer } from "../expense/add/ExpenseDrawer";

export const SideBar: React.FC = () => {
  // Use the auth context to get user information and logout function
  const { user } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  // Handle form submission to logout the user
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(performLogout());
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Estado para el manejo del formulario de CreatedExpensed
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header" onClick={toggleSidebar}>
        <span className="sidebar-logo">
          <Menu />
        </span>
        {!isCollapsed && <h2 className="sidebar-title">Dashboard</h2>}
      </div>

      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <a className="sidebar-link">
              <ShieldUser />
              {!isCollapsed && <span>Owner: {user?.username}</span>}
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link">
              <CircleDollarSign />
              {!isCollapsed && <span>Gastos</span>}
              {!isCollapsed && <ChevronDown className="arrow" />}
            </a>
            <ul className="sidebar-submenu">
              <li className="sidebar-subitem">
                <a className="sidebar-sublink" onClick={openDrawer}>
                  <Plus />
                  Nuevo Gasto
                </a>
                <ExpenseDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
              </li>
              <li className="sidebar-subitem">
                <a className="sidebar-sublink" href="#list-of-expenses">
                  <ListMinus />
                  Lista de Gastos
                </a>
              </li>
            </ul>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/profile"}>
              <CircleUserRound />
              {!isCollapsed && <span>Cuenta</span>}
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <form onSubmit={handleSubmit}>
          <button type="submit">Cerrar Sesión</button>
        </form>
      </div>
    </aside>
  );
};
