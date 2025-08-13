import React from "react";
import "../../../styles/Search.css";

interface Props {
  filterTitle: string | null;
  setFilterTitle: (title: string) => void;
}

export const Search: React.FC<Props> = ({ filterTitle, setFilterTitle }) => {
  return (
    <input
      type="text"
      placeholder="Buscar por título..."
      value={filterTitle ?? ""}
      onChange={(e) => setFilterTitle(e.target.value)}
      className="search-input"
    />
  );
};
