export class UserValidations {
  // Validar que todos los campos requeridos existan
  static checkNotEmptyFields = (name, username, email, password) => {
    if (!name || !username || !email || !password) {
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
  static checkTypeOfFields = (name, username, email, password) => {
    if (
      typeof name !== "string" ||
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
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

  //Validar la logitud de la contraseña
  static validLongPassword = (password) => {
    if (password.length < 5) {
      return {
        valid: false,
        error: {
          status: 400,
          message: { error: "Password must be at least 5 characters" },
        },
      };
    }

    return { valid: true };
  };
}
