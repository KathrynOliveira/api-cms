import { Request, Response } from "express";
import * as authService from "../services/authService";
import { error, success } from "../utils/response";

const AuthController = {
  async auth(req: Request, res: Response) {
    try {
      const { user, token } = await authService.login(req.body, res);
      return success(res, "Autenticação bem-sucedida.", { user, token }, 200);
    } catch (error: any) {
      return error(res, error.message, error.details, error.status || 500);
    }
  },
};

export default AuthController;
