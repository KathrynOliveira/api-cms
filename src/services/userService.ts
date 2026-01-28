import db from "../lib/prisma";
import bcrypt from "bcrypt";

import { Prisma } from "@prisma/client";
import { ApiError } from "../errors/ApiError";

export async function findUserByEmail(email: string) {
  return db.user.findFirst({ where: { email } });
}

export async function findUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}

export async function validatePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function createUser(data: Prisma.UserCreateInput) {
  const exists = await db.user.findUnique({
    where: { email: data.email },
  });
  if (exists) {
    throw new ApiError("E-mail já cadastrado.", 409);
  }
  // Garante role em uppercase
  if (data.role) {
    data.role = data.role.toUpperCase() as any;
  }
  // Garante hash de senha
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  const user = await db.user.create({ data });
  // Remove a propriedade password do retorno
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
