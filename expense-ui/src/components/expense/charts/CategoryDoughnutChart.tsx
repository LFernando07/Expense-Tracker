import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { Expense } from "../../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  expenses: Expense[];
}

export const CategoryDoughnutChart: React.FC<Props> = ({ expenses }) => {
  // Validar si no hay datos
  if (!expenses || expenses.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        No hay datos suficientes para generar la gráfica.
      </p>
    );
  }

  // Agrupar montos por categoría
  const getExpensesByCategory = (expenses: Expense[]) => {
    const totals: Record<string, number> = {};
    for (const expense of expenses) {
      const category = expense.category;
      totals[category] = (totals[category] || 0) + expense.amount;
    }
    return totals;
  };

  const categoryTotals = getExpensesByCategory(expenses);
  const categoryLabels = Object.keys(categoryTotals);
  const categoryData = Object.values(categoryTotals);
  const totalAmount = categoryData.reduce((acc, val) => acc + val, 0);

  const colors = [
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#6366f1",
    "#a855f7",
    "#14b8a6",
    "#f43f5e",
    "#8b5cf6",
    "#3b82f6",
    "#22c55e",
  ];

  const data = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryData,
        backgroundColor: colors.slice(0, categoryLabels.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (tooltipItem: any) => {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            const percentage = ((value / totalAmount) * 100).toFixed(1);
            return `${label}: $${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};
