import type React from "react";
import { FILTERS_BUTTONS } from "../../../consts";
import type { FilterValue } from "../../../types";
import "../../../styles/Filters.css";

interface Props {
  filterSelected: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<Props> = ({
  filterSelected,
  onFilterChange,
}) => {
  return (
    <ul className="filters">
      {Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = key === filterSelected;
        const className = isSelected ? "selected" : "";

        return (
          <li
            key={key}
            className="filter-option"
            onClick={(event) => {
              event.preventDefault();
              onFilterChange(key as FilterValue);
            }}
          >
            <a href={href} className={className}>
              {literal}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
