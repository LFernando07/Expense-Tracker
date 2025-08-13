import React, { useEffect, useState } from "react";
import { SideBar } from "../components/layout/SideBar";
import { CircleDollarSign } from "lucide-react";
import { MetricCard } from "../components/expense/charts/MetricCard";
import { ListOfExpenses } from "../components/expense/table/ListOfExpenses";
import { ExpenseBarChart } from "../components/expense/charts/ExpenseBarChart";
import { CategoryDoughnutChart } from "../components/expense/charts/CategoryDoughnutChart";
import { ChartCards } from "../components/expense/charts/ChartCards";
import "../styles/DashBoard.css";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { fetchExpenses } from "../store/thunks/expense.thunks";

const DashboardPage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();

  // ✅ CORRECTO: Obtener datos del estado de Redux
  const { expenses } = useAppSelector((state) => state.expenseReducer);

  // Estado para filtrado de expenses
  const activeExpenses = expenses.filter(
    (expense) => expense.isDelete !== true
  );

  const allExpenses = isActive ? activeExpenses : expenses;

  // ✅ Métricas calculadas dinámicamente
  const totalGastos = allExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  const gastoMasAlto = allExpenses.reduce((maxExpense, currentExpense) => {
    return currentExpense.amount > maxExpense.amount
      ? currentExpense
      : maxExpense;
  }, allExpenses[0]);

  const gastoMasReciente = allExpenses
    .filter((e) => e.date !== undefined) // Filtrar los que sí tienen fecha
    .sort(
      // Realizar la operacion si date es diferente de undefined
      (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
    )[0];

  const totalCategorias = new Set(allExpenses.map((e) => e.category)).size;

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div className="dashboard-layout">
      <div>
        <SideBar />
      </div>
      <div>
        <h1 className="dashboard-title">Gastly Dashboard</h1>
        <div className="dashboard-content-container">
          <section className="metric-section">
            <div
              className="metric-item active-expenses"
              style={{ gridColumn: "1 / -1" }}
            >
              <input
                type="checkbox"
                id="active"
                className="check-active"
                onChange={() => setIsActive(!isActive)}
              />
              <label htmlFor="active" className="label-active">
                {!isActive ? "Todos los gastos" : "Solo activos"}
              </label>
            </div>

            <div className="metric-item">
              <CircleDollarSign />
              <MetricCard
                title="Total Gastos"
                value={`$${totalGastos.toFixed(2)}`}
              />
            </div>

            <div className="metric-item">
              <CircleDollarSign />
              <MetricCard
                title="Categorías"
                value={totalCategorias.toString()}
              />
            </div>

            <div className="metric-item">
              <CircleDollarSign />
              <MetricCard
                title="Gasto más alto"
                value={
                  gastoMasAlto
                    ? `${gastoMasAlto.title} | $${gastoMasAlto.amount}`
                    : "No hay gastos"
                }
              />
            </div>

            <div className="metric-item">
              <CircleDollarSign />
              <MetricCard
                title="Gasto más reciente"
                value={
                  gastoMasReciente
                    ? `${gastoMasReciente.title} | $${gastoMasReciente.amount}`
                    : "No hay gastos"
                }
              />
            </div>
          </section>

          <section className="chart-section">
            <div className="chart-item">
              <h4 className="chart-title">Gastos por Mes</h4>
              <ExpenseBarChart expenses={allExpenses} />
            </div>
            <div className="chart-item">
              <h4 className="chart-title">Distribucion por categoría</h4>
              <CategoryDoughnutChart expenses={allExpenses} />
            </div>
            <div className="chart-item">
              <h4 className="chart-title">Grafica de puntos</h4>
              <ChartCards expenses={allExpenses} />
            </div>
          </section>

          <section className="expense-list-section">
            <ListOfExpenses expenses={allExpenses} />
          </section>
        </div>
        <div className="dashboard-footer">
          <p>© 2023 Gastly. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
