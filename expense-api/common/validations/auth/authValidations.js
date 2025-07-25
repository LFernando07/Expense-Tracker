export class AutenticationValidations {
  // Valid request body completed
  static checkNotEmptyCredentials = (email, password) => {
    if (!email || !password) {
      // Construccion de objeto
      return {
        valid: false,
        error: {
          status: 422,
          message: "Email and password are required to login",
        },
      };
    }

    // Cumple las validaciones
    return { valid: true };
  };

  static checktypeOfCredentials = (email, password) => {
    if (typeof email !== "string" || typeof password !== "string") {
      return {
        valid: false,
        error: {
          status: 400,
          message: "Invalid data types",
        },
      };
    }

    return { valid: true };
  };
}
