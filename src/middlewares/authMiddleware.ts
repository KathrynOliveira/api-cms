import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token =
    req.cookies?.token || req.headers["authorization"]?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso não autorizado. Token ausente." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
