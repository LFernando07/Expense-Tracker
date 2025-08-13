import type React from "react";
import type { FilterValue } from "../../../types";
import { Filters } from "./Filters";
import "../../../styles/HeaderTable.css";
import { Search } from "./Search";

interface Props {
  filterTitle: string | null;
  setFilterTitle: React.Dispatch<React.SetStateAction<string | null>>;
  recordCount: number;
  activeCount: number;
  filterSelected: FilterValue;
  handleFilterChange: (filter: FilterValue) => void;
}

export const HeaderTable: React.FC<Props> = ({
  filterTitle,
  setFilterTitle,
  recordCount,
  activeCount,
  filterSelected,
  handleFilterChange,
}) => {
  // LOGICA NUEVA
  const singleActiveCount = activeCount === 1;
  const activeTodoWord = singleActiveCount ? "gasto" : "gastos";

  return (
    <header className="expenses-header">
      <Search filterTitle={filterTitle} setFilterTitle={setFilterTitle} />

      <span className="expense-records">
        <strong>{recordCount}</strong> {activeTodoWord} encontrado
        {!singleActiveCount && "s"}
      </span>
      <span className="expense-count">
        <strong>{activeCount}</strong> {activeTodoWord} activo
        {!singleActiveCount && "s"}
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
    </header>
  );
};
