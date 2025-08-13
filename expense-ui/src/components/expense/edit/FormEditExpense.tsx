import React, { useState, useEffect, type FormEvent } from "react";
import Modal from "react-modal";
import { Calendar } from "../form/Calendar";
import { toast } from "sonner";
import type { Expense } from "../../../types";
import { useAppDispatch } from "../../../hooks/store";
import { updateExpense } from "../../../store/thunks/expense.thunks";
import "../../../styles/FormEditExpense.css";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  expense: Expense | null; // El expense a editar
}

const FormEditExpense: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  expense,
}) => {
  const dispatch = useAppDispatch();

  const [expenseForm, setExpenseForm] = useState({
    title: "",
    description: "",
    amount: 0,
    category: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [error, setError] = useState("");

  // Llenar el formulario cuando se abre el modal con un expense
  useEffect(() => {
    if (expense && isOpen) {
      setExpenseForm({
        title: expense.title,
        description: expense.description || "",
        amount: expense.amount,
        category: expense.category,
      });
      setSelectedDate(expense.date ? new Date(expense.date) : undefined);
    }
  }, [expense, isOpen]);

  const closeModal = () => {
    onRequestClose();
    setExpenseForm({ title: "", description: "", amount: 0, category: "" });
    setSelectedDate(undefined);
    setError("");
  };

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !expenseForm.title ||
      !selectedDate ||
      !expenseForm.category ||
      expenseForm.amount === 0
    ) {
      const errorMessage = "Por favor completa todos los campos obligatorios";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (!expense) {
      toast.error("No hay expense para editar");
      return;
    }

    const updatedData: Partial<Expense> = {
      title: expenseForm.title,
      description: expenseForm.description,
      amount: expenseForm.amount,
      category: expenseForm.category,
      date: selectedDate,
    };

    try {
      await dispatch(updateExpense({ id: expense.id, data: updatedData }));
      toast.success(`Expense: ${updatedData.title} actualizado exitosamente!`);
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err?.data?.error ||
        err?.data?.message ||
        "Error al actualizar el gasto.";

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Editar Gasto"
      className="custom-modal"
      overlayClassName="custom-modal-overlay"
    >
      <div className="custom-modal-header">Editando Gasto...</div>

      <form onSubmit={handleEditSubmit} className="custom-form">
        {/* Título */}
        <div className="custom-form-group">
          <label className="custom-label">Título *</label>
          <input
            type="text"
            value={expenseForm.title}
            onChange={(e) =>
              setExpenseForm({ ...expenseForm, title: e.target.value })
            }
            className="custom-input"
            placeholder="Título del gasto"
            required
          />
        </div>

        {/* Descripción */}
        <div className="custom-form-group">
          <label className="custom-label">Descripción</label>
          <input
            type="text"
            value={expenseForm.description}
            onChange={(e) =>
              setExpenseForm({ ...expenseForm, description: e.target.value })
            }
            className="custom-input"
            placeholder="Descripción opcional"
          />
        </div>

        {/* Monto */}
        <div className="custom-form-group">
          <label className="custom-label">Monto *</label>
          <input
            type="number"
            value={expenseForm.amount}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                amount: parseFloat(e.target.value) || 0,
              })
            }
            min={0}
            max={500000}
            step="0.01"
            className="custom-input"
            placeholder="0.00"
            required
          />
        </div>

        {/* Categoría */}
        <div className="custom-form-group">
          <label className="custom-label">Categoría *</label>
          <select
            value={expenseForm.category}
            onChange={(e) =>
              setExpenseForm({ ...expenseForm, category: e.target.value })
            }
            className="custom-select"
            required
          >
            <option value="">Elige una categoría</option>
            <option value="Groceries">Groceries</option>
            <option value="Leisure">Leisure</option>
            <option value="Electronics">Electronics</option>
            <option value="Utilities">Utilities</option>
            <option value="Clothing">Clothing</option>
            <option value="Health">Health</option>
          </select>
        </div>

        {/* Fecha */}
        <div className="custom-form-group">
          <label className="custom-label">Fecha *</label>
          <Calendar selected={selectedDate} setSelected={setSelectedDate} />
        </div>

        {/* Error */}
        {error && <div className="custom-error">{error}</div>}

        {/* Botones */}
        <div className="custom-buttons">
          <button type="submit" className="custom-btn custom-btn-primary">
            Actualizar Gasto
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="custom-btn custom-btn-danger"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormEditExpense;
