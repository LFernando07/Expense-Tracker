import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { Expense } from "../../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  expenses: Expense[];
}

export const ChartCards: React.FC<Props> = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        No hay datos para mostrar.
      </p>
    );
  }

  // Obtener lista de meses en formato "YYYY-MM"
  const getMonthLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  // Agrupamos por categoría y mes
  const groupedData: Record<string, Record<string, number>> = {};

  const validExpenses = expenses.filter((e) => e.date !== undefined);

  validExpenses.forEach((expense) => {
    const month = getMonthLabel(expense.date!.toString()); // `!` ok porque ya filtramos
    const category = expense.category;

    if (!groupedData[category]) {
      groupedData[category] = {};
    }

    if (!groupedData[category][month]) {
      groupedData[category][month] = 0;
    }

    groupedData[category][month] += expense.amount;
  });

  // Obtener lista única de meses
  const allMonths = Array.from(
    new Set(validExpenses.map((e) => getMonthLabel(e.date!.toString())))
  ).sort();

  // Colores para datasets
  const colors = [
    "#c084fc",
    "#f87171",
    "#4ade80",
    "#60a5fa",
    "#facc15",
    "#ec4899",
    "#34d399",
    "#f97316",
    "#a78bfa",
    "#f43f5e",
  ];

  const datasets = Object.entries(groupedData).map(
    ([category, monthsData], index) => ({
      label: category,
      data: allMonths.map((month) => monthsData[month] || 0),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      tension: 0.3,
    })
  );

  const data = {
    labels: allMonths,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Gastos mensuales por categoría",
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            return `$${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <Line options={chartOptions} data={data} />
    </div>
  );
};
