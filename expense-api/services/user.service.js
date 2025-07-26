import { PrismaClient } from "@prisma/client";

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

// Retornar un usuario en especifico
export const getUserById = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
    },
  });
};

export const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
    },
  });
};

// Crear un usuario
export const createUser = async (data) => {
  const { email } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  return prisma.user.create({
    data: {
      ...data,
    },
  });
};

// Actualizar informacion de un usuario excepto la contraseña

export const modificatedUser = async (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data: data,
  });
};

// Eliminar un usuario
export const deleteUserById = async (userId) => {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
