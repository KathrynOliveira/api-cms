import { Request, Response } from "express";
import * as authService from "../services/authService";
import { error, success } from "../utils/response";

const AuthController = {
  async auth(req: Request, res: Response) {
    try {
      const { user, token } = await authService.login(req.body, res);
      return success(res, "Autenticação bem-sucedida.", { user, token }, 200);
    } catch (err: any) {
      return error(res, err.message, err.details, err.status || 500);
    }
  },
};

export default AuthController;
