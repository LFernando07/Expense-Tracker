import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { type Expense } from "../../../types";

// Estructura de la grafica
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  expenses: Expense[];
}

export const ExpenseBarChart: React.FC<Props> = ({ expenses }) => {
  // Calcular el total por mes
  const getMonthlyExpenses = (expenses: Expense[]) => {
    const monthlyTotals = Array(12).fill(0);

    for (const expense of expenses) {
      if (!expense.date) continue; // ← Ignora los que no tienen fecha válida

      const date = new Date(expense.date);
      if (isNaN(date.getTime())) continue; // ← Ignora fechas inválidas

      const month = date.getMonth();
      monthlyTotals[month] += expense.amount;
    }

    return monthlyTotals;
  };

  const monthlyData = getMonthlyExpenses(expenses);

  const data = {
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    datasets: [
      {
        label: "Gastos ($)",
        data: monthlyData,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
};
