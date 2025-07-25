export class ExpenseValidations {
  // Validar que todos los campos requeridos existan
  static checkNotEmptyExpense = (
    title,
    description,
    category,
    amount,
    date
  ) => {
    if (!title || !description || !category || !amount || !date) {
      return {
        valid: false,
        error: {
          status: 400,
          message: { error: "All fields are required" },
        },
      };
    }

    return { valid: true };
  };

  // Validar que todos los campos sean del tipo de dato requerido
  static checkTypeOfFields = (title, description, category, amount) => {
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof category !== "string" ||
      typeof amount !== "number"
    ) {
      return {
        valid: false,
        error: {
          status: 400,
          message: { error: "Invalid data types" },
        },
      };
    }

    return { valid: true };
  };
}
