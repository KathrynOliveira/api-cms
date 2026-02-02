import { Request, Response, NextFunction } from "express";
import { error } from "../utils/response";

export function isAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // @ts-ignore
  if (req.user && req.user.role === "ADMIN") {
    return next();
  }
  return error(
    res,
    "Acesso negado. Permissões insuficientes.",
    "Acesso Negado!",
    403,
  );
}
