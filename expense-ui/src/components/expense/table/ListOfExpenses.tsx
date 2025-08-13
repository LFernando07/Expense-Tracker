import type React from "react";
import { TableExpenses } from "./TableExpenses";
import type { Expense } from "../../../types";

interface Props {
  expenses: Expense[];
}

export const ListOfExpenses: React.FC<Props> = ({ expenses }) => {
  return (
    <div id="list-of-expenses">
      <TableExpenses expenses={expenses} />
    </div>
  );
};
