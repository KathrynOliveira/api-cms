import db from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";
import { ApiError } from "../errors/ApiError";
import { Response } from "express";

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

export async function authenticateUser(data: {
  email: string;
  password: string;
}) {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new ApiError("Email inválido.", 401, "Erro de Autenticação");
  }
  const isPasswordValid = await validatePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new ApiError("Senha inválida.", 401, "Erro de Autenticação");
  }
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function setAuthTokenCookie(res: Response, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 hora
  });
}

export async function login(
  data: {
    email: string;
    password: string;
  },
  res: Response,
) {
  const user = await authenticateUser(data);
  const token = generateToken(user);
  setAuthTokenCookie(res, token);
  return { user, token };
}
