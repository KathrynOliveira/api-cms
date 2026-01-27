import db from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export async function findUserByEmail(email: string) {
  return db.user.findFirst({ where: { email } });
}

export async function validatePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: Pick<User, "id" | "email" | "role">) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" },
  );
}
