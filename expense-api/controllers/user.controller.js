import bcrypt from "bcryptjs";

import {
  getUserById,
  createUser,
  modificatedUser,
  deleteUserById,
  getUserByEmail,
} from "../services/user.service.js";

import handleException from "../common/handle_request.js";
import { UserValidations } from "../common/validations/user/userValidations.js";
import { Validations } from "../common/common_validations.js";

// Obtener un usuario
export const getUser = handleException(async (req, res) => {
  // Obtener el usuario activo
  const userId = req.user.id;
  // Obtener el usuario mandado
  const { id } = req.params;

  if (parseInt(id, 10) !== userId) {
    return res.status(403).json({ error: "Access denied" });
  }

  if (!Validations.validatedId(userId).valid) {
    return res
      .status(Validations.validatedId(userId).error.status)
      .json(Validations.validatedId(userId).error.message);
  }

  // Buscar el usuario
  try {
    const activeUser = await getUserById(userId);

    // retornar usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = activeUser;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(403).json({ error: "Error fetching user" });
  }
});

// Crear un usuario
export const addUser = handleException(async (req, res) => {
  // Obtenemos las propiedades del usuario
  const { name, username, email, password } = req.body;

  // Validations ------------------------------------------
  // Validar que existan los campos requeridos
  const validBody = UserValidations.checkNotEmptyFields(
    name,
    username,
    email,
    password
  );
  if (!validBody.valid) {
    return res.status(validBody.error.status).json(validBody.error.message);
  }

  // validar su tipo de dato
  const validTypeBody = UserValidations.checkTypeOfFields(
    name,
    username,
    email,
    password
  );
  if (!validTypeBody.valid) {
    return res
      .status(validTypeBody.error.status)
      .json(validTypeBody.error.message);
  }

  // Validar formato de email
  if (!Validations.validEmailFormatter(email).valid) {
    return res
      .status(Validations.validEmailFormatter(email).error.status)
      .json(Validations.validEmailFormatter(email).error.message);
  }

  // Validar longitud de contraseña
  if (!UserValidations.validLongPassword(password).valid) {
    return res
      .status(UserValidations.validLongPassword(password).error.status)
      .json(UserValidations.validLongPassword(password).error.message);
  }

  // -------------------------------------------------------
  // Check if user already exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Hasheamos la contraseña
  const salt = parseInt(process.env.SALT_ROUNDS, 10) || 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creamos el nuevo usuario
  const newUser = await createUser({
    name,
    username,
    email,
    password: hashedPassword,
  });

  // retornar usuario sin la contraseña
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(200).json(userWithoutPassword);
});

// Modificar un usuario
export const updateUser = handleException(async (req, res) => {
  // Obtenemos el usuario
  // Obtener el usuario activo
  const userId = req.user.id;
  console.log(userId);

  if (!Validations.validatedId(userId).valid) {
    return res
      .status(Validations.validatedId(userId).error.status)
      .json(Validations.validatedId(userId).error.message);
  }

  // Obtenemos las propiedades de la peticion
  const { name, username, email, password } = req.body;

  // Check if user exists
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  // Validar email si se envía y cambió
  if (email && email !== existingUser.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const emailUser = await getUserByEmail(email);
    if (emailUser && emailUser.id !== userId) {
      return res.status(409).json({ error: "Email already in use" });
    }
  }

  // Validar username si se envía y cambió
  if (username && username !== existingUser.username) {
    if (typeof username !== "string") {
      return res.status(400).json({ error: "Invalid username type" });
    }

    const usernameUser = await prisma.user.findUnique({
      where: { username },
    });
    if (usernameUser && usernameUser.id !== userId) {
      return res.status(409).json({ error: "Username already in use" });
    }
  }

  if (password && password.length < 5) {
    return res
      .status(400)
      .json({ error: "Password must be at least 5 characters" });
  }

  // Actualizamos un usuario
  try {
    const updatedData = {};
    if (name) updatedData.name = name;
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (password) {
      const salt = parseInt(process.env.SALT_ROUNDS, 10) || 10;
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await modificatedUser(userId, updatedData);

    const { password: _, ...userWithoutPassword } = updatedUser;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(406).json({ error: "Data not content" });
  }
});

// Eliminar un usuario
export const deleteUser = handleException(async (req, res) => {
  // Obtenemos el usuario
  // Obtener el usuario activo
  const userId = req.user.id;
  // Obtener el usuario mandado
  const { id } = req.params;

  if (parseInt(id, 10) !== userId) {
    return res.status(403).json({ error: "Access denied" });
  }

  if (!Validations.validatedId(userId).valid) {
    return res
      .status(Validations.validatedId(userId).error.status)
      .json(Validations.validatedId(userId).error.message);
  }

  // Check if user exists
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    await deleteUserById(userId);

    res.status(204).send();
  } catch (error) {
    res.status(406).json({ error: "Failed delete" });
  }
});
