import React, { useState } from "react";
import { Calendar } from "./Calendar";
import "../../../styles/CreatedExpenseForm.css";
import { toast } from "sonner";
import type { Expense } from "../../../types";
import { useAppDispatch } from "../../../hooks/store";
import { createExpense } from "../../../store/thunks/expense.thunks";

export const CreatedExpenseForm: React.FC = () => {
  // Obtner el dispatch para crear un nuevo gasto
  const dispatch = useAppDispatch();

  // Estado para control de errores
  const [, setError] = useState("");

  // Selector de fecha
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handleCreated = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!title || selectedDate == undefined || !category || amount === 0) {
      setError("Por favor llena todos los campos del formulario!");
      toast.error("Por favor llena todos los campos del formulario!");
      return;
    }

    const expense: Omit<Expense, "id" | "isDelete"> = {
      title,
      description,
      amount,
      category,
      date: selectedDate,
    };

    try {
      // console.log("expenseData", {
      //   ...expense,
      //   date: selectedDate?.toISOString(),
      // });

      await dispatch(createExpense(expense));

      toast.success(`Expense: ${expense.title} creado exitosamente!`); // ✅ Toast de éxito
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err?.data?.error ||
        err?.data?.message ||
        "Error al crear un nuevo gasto.";

      setError(errorMessage);
      toast.error(errorMessage); // ✅ También mostrar en toast
    }
  };

  return (
    <section className="expense-section">
      <div className="expense-form-container">
        <form className="expense-form" onSubmit={handleCreated}>
          <h3 className="text-header">Add new Expense</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="expense-text" htmlFor="title">
                Title:
              </label>
              <input
                className="expense-input"
                type="text"
                name="title"
                id="title"
                placeholder="Escribe el titulo"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target["value"]);
                }}
              />
            </div>
            <div className="form-group">
              <label className="expense-text" htmlFor="description">
                Description:
              </label>
              <textarea
                className="expense-input"
                name="description"
                id="description"
                placeholder="Escribe la descripcion"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescription(e.target["value"]);
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="expense-text" htmlFor="amount">
                Amount:
              </label>
              <input
                className="expense-input"
                type="number"
                name="amount"
                id="amount"
                min={0}
                max={500000}
                placeholder="Cantidad ($$): "
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAmount(parseFloat(e.target["value"]));
                }}
              />
            </div>
            <div className="form-group">
              <label className="expense-text" htmlFor="category">
                Categoria:
              </label>
              <select
                className="expense-input-select"
                name="category"
                id="category"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setCategory(e.target["value"]);
                }}
              >
                <option value="">Elige una categoria</option>
                <option value="Groceries">Groceries</option>
                <option value="Leisure">Leisure</option>
                <option value="Electronics">Electronics</option>
                <option value="Utilities">Utilities</option>
                <option value="Clothing">Clothing</option>
                <option value="Health">Health</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="expense-text" htmlFor="date">
              Selecciona una fecha:
            </label>
            <Calendar selected={selectedDate} setSelected={setSelectedDate} />
          </div>

          <div className="form-group">
            <button type="submit" className="save-button">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
