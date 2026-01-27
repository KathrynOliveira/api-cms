import db from "../lib/prisma";
import bcrypt from "bcrypt";

import { Prisma } from "@prisma/client";

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
  return db.user.create({ data });
}
