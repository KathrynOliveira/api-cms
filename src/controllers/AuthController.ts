import { Request, Response } from "express";
import * as authService from "../services/authService";
import { error, success } from "../utils/response";

const AuthController = {
  async auth(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return error(
          res,
          "E-mail e senha são obrigatórios.",
          "Erro de Autenticação",
          400,
        );
      }

      const user = await authService.findUserByEmail(email);
      if (!user) {
        return error(
          res,
          "Usuário ou senha inválidos.",
          "Erro de Autenticação",
          401,
        );
      }

      const isPasswordValid = await authService.validatePassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        return error(
          res,
          "Usuário ou senha inválidos.",
          "Erro de Autenticação",
          401,
        );
      }

      const token = authService.generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hora
      });

      return success(res, "Autenticação bem-sucedida.", { token }, 200);
    } catch (error: any) {
      return error(res, "Erro na autenticação.", "Erro de Autenticação", 500);
    }
  },
};

export default AuthController;
