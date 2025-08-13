import type React from "react";

interface Props {
  title: string;
  value: string;
}

export const MetricCard: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="sm-white p-4 rounded shadow">
      <p className="text-white-500 text-sm">{title}</p>
      <h3 className="text-3x2 font-semibold">{value}</h3>
    </div>
  );
};
