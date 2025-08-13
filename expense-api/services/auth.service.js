import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

//
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
const JWT_EXPIRES_IN = "1h"; // Durabilidad de 1 hora

// ✅ Verifica credenciales al iniciar sesión
export const validateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
};

// ✅ Genera un JWT con el payload del usuario
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// ✅ Verifica un token y devuelve el payload decodificado
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
