import { Request, Response } from "express";
import * as userService from "../services/userService";
import { error, success } from "../utils/response";

export default {
  // Cria um novo usuário
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);

      return success(res, "Usuário criado com sucesso.", user, 201);
    } catch (err: any) {
      return error(res, err.message, err.details, err.status || 500);
    }
  },

  // Retorna todos os usuários
  async getAllUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const users = await userService.getAllUsers(page, pageSize);
      return success(res, "Usuários recuperados com sucesso.", users);
    } catch (error: any) {
      return error(res, "Erro ao recuperar usuários.", undefined, 500);
    }
  },

  // Retorna os dados do usuário autenticado
  async getMe(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const user = await userService.findUserById(userId);
      if (!user) {
        return error(res, "Usuário não encontrado.", undefined, 404);
      }
      return success(res, "Dados do usuário recuperados com sucesso.", {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error: any) {
      return error(res, "Erro ao cadastrar usuário.", undefined, 500);
    }
  },
};
