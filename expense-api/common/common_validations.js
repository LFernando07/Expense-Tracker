export class Validations {
  // Validar el tipo de dato del id
  static validatedId = (id) => {
    if (isNaN(userId)) {
      return {
        valid: false,
        error: {
          status: 400,
          message: { error: "Invalid data type ID" },
        },
      };
    }

    return { valid: true };
  };

  static validEmailFormatter = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        valid: false,
        error: {
          status: 400,
          message: "Invalid email format, required @",
        },
      };
    }

    return { valid: true };
  };
}
