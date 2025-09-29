import { validateUser, generateToken } from "../services/auth.service.js";
import handleException from "../common/handle_request.js";
import { AutenticationValidations as AuthVal } from "../common/validations/auth/authValidations.js";
import { Validations } from "../common/common_validations.js";

// TODO: Request 3 times to login -> without banned user temporally
const loginAttempts = {}; // -> Generate login attempts object

// Logueamos al usuario para darle acceso
export const login = handleException(async (req, res) => {
  // Obtenemos las credenciales de autenticacion
  const { email, password } = req.body;

  // Limitar a 3 intentos por email para iniciar sesion
  if (!loginAttempts[email]) {
    loginAttempts[email] = { count: 0, lastAttempt: new Date() };
  }

  if (loginAttempts[email].count >= 3) {
    return res
      .status(429)
      .json({ error: "Too many login attempts. Please try again later." });
  }

  // Validaciones --------------------------------------
  // Validar existencia de los campos
  const validCredentials = AuthVal.checkNotEmptyCredentials(email, password);
  if (!validCredentials.valid) {
    return res
      .status(validCredentials.error.status)
      .json({ error: validCredentials.error.message });
  }

  // Validar si existen que sean de tipo string

  if (!AuthVal.checktypeOfCredentials(email, password).valid) {
    return res
      .status(AuthVal.checktypeOfCredentials(email, password).error.status)
      .json({
        error: AuthVal.checktypeOfCredentials(email, password).error.message,
      });
  }

  // Validar formato de email
  if (!Validations.validEmailFormatter(email).valid) {
    return res
      .status(Validations.validEmailFormatter(email).error.status)
      .json({
        error: Validations.validEmailFormatter(email).error.message,
      });
  }

  // --------------------------------------------------

  // Logueamos al usuario
  const user = await validateUser(email, password);
  if (!user) {
    loginAttempts[email].count += 1;
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generamos un toquen
  const { token, expiresAt, expiresIn } = generateToken(user);

  res.cookie("access_token", token, expiresAt, expiresIn, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none", // o 'Strict', según tus necesidades
    maxAge: 1000 * 60 * 60,
  });

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
    session: {
      token,
      expiresAt, // fecha exacta de expiración
      expiresIn, // segundos de duración
    },
  });
});

// Cerramos sesion del usuario
export const logout = handleException(async (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ❗️ Solo true en prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ❗️ Correcto manejo
    })
    .json({ message: "Logout successful" });
});

// Obtener perfil del usuario autenticado
export const profile = handleException(async (req, res) => {
  const dataUser = req.user;
  // Desestructuramos la informacion de profile
  const user = Object.fromEntries(
    Object.entries(dataUser).filter(([key]) => key !== "exp" && key !== "iat")
  );
  const session = req.session;

  if (!user) return res.status(403).json({ error: "Access not authorized" });

  res.json({ user, session });
});
