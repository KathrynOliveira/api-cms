import { Response } from "express";

export const success = (
  res: Response,
  message: string,
  data?: any,
  status = 200,
) => res.status(status).json({ status: "success", message, data });

export const error = (
  res: Response,
  message: string,
  details?: any,
  status = 500,
) => res.status(status).json({ status: "error", message, details });
