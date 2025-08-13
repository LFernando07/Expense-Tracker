import type React from "react";
import { type Expense, type FilterValue, type ExpenseId } from "../../../types";
import { HeaderTable } from "./HeaderTable";
import { useMemo, useState } from "react";
import { EXPENSE_FILTERS, FILTERS_BUTTONS } from "../../../consts";
import "../../../styles/TableExpense.css";
import { SquareMinus, SquarePen } from "lucide-react";
import { useAppDispatch } from "../../../hooks/store";
import { softDeleteExpense } from "../../../store/thunks/expense.thunks";
import FormEditExpense from "../edit/FormEditExpense"; // 👈 Import del modal
import { toast } from "sonner";
import Swal from "sweetalert2";

interface Props {
  expenses: Expense[];
}

export const TableExpenses: React.FC<Props> = ({ expenses }) => {
  // Obtención de dispatch
  const dispatch = useAppDispatch();

  // Estados para el modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  // Filtrado de botones
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    EXPENSE_FILTERS.ALL
  );

  // Filtrado de búsqueda por texto
  const [filterTitle, setFilterTitle] = useState<string | null>(null);

  // Filtrar nuestros gastos por fechas
  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const filterExpenses = useMemo(() => {
    console.log("re-renderized");
    return expenses.filter((expense) => {
      if (!expense.date) return false; // 👈 asegúrate de que haya fecha

      const expenseTime = new Date(expense.date).getTime();

      if (filterSelected === EXPENSE_FILTERS.LASTWEEK)
        return expenseTime > Date.now() - 7 * 24 * 60 * 60 * 1000;

      if (filterSelected === EXPENSE_FILTERS.LASTMONTH)
        return expenseTime > Date.now() - 30 * 24 * 60 * 60 * 1000;

      if (filterSelected === EXPENSE_FILTERS.LAST3MONTH)
        return expenseTime > Date.now() - 90 * 24 * 60 * 60 * 1000;

      return true;
    });
  }, [expenses, filterSelected]);

  const activeCount = filterExpenses.filter(
    (expenses) => !expenses.isDelete
  ).length;

  const recordExpenses = filterExpenses.length;

  // Si hay un filtro de texto, filtrar por título
  // Valida que sea string y no esté vacío para realizar el filtrado
  const filteredTitleExpenses = useMemo(() => {
    console.log("calculated filter");
    if (filterTitle && filterTitle.length > 0) {
      return filterExpenses.filter((expense) =>
        expense.title.toLowerCase().includes(filterTitle.toLowerCase())
      );
    }
    return filterExpenses; // devolver todos si no hay filtro
  }, [filterTitle, filterExpenses]);

  // Funciones CRUD

  // Función para abrir el modal de edición
  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  // Función para cerrar el modal de edición
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedExpense(null);
  };

  const handleSoftDelete = (id: ExpenseId, idx: number) => {
    Swal.fire({
      title: "Quieres remover este gasto?",
      text: "No podrás recuperarla después de eliminarla.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, remover!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminamos la nota
        await dispatch(softDeleteExpense({ id: id, index: idx }));

        toast.success("Gasto removido exitosamente");
      }
    });
  };

  return (
    <section className="expenses-wrapper">
      <HeaderTable
        filterTitle={filterTitle}
        setFilterTitle={setFilterTitle}
        recordCount={recordExpenses}
        activeCount={activeCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
      />
      <table className="expenses-table">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>AMOUNT</th>
            <th>CATEGORY</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {filteredTitleExpenses.length > 0 ? (
            filteredTitleExpenses.map((expense: Expense, idx) => (
              <tr key={`${expense.id}-${expense.id}`}>
                <td>{expense.title}</td>
                <td>{expense.description || "—"}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>
                  <span className={`badge ${expense.category.toLowerCase()}`}>
                    {expense.category}
                  </span>
                </td>
                <td>
                  {expense.date
                    ? new Date(expense.date).toLocaleDateString()
                    : "Fecha no disponible"}
                </td>
                <td>
                  <span
                    className={`badge ${
                      expense.isDelete ? "delete" : "active"
                    }`}
                  >
                    {expense.isDelete ? "Delete" : "Active"}
                  </span>
                </td>
                <td>
                  <div
                    className="actions"
                    style={{
                      display: "flex",
                      gap: "12px",
                      justifyContent: "center",
                    }}
                  >
                    {/* Botón de editar - ahora funcional */}
                    <button
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => handleEditExpense(expense)}
                      title="Editar gasto"
                    >
                      <SquarePen />
                    </button>
                    <button
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleSoftDelete(expense.id, idx)}
                      title="Eliminar gasto"
                    >
                      <SquareMinus />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  Gastos no encontrados en{" "}
                  {FILTERS_BUTTONS[filterSelected].literal}
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de edición */}
      <FormEditExpense
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseEditModal}
        expense={selectedExpense}
      />
    </section>
  );
};
