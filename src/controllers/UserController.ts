import { Request, Response } from "express";
import * as userService from "../services/userService";
import { error, success } from "../utils/response";

export default {
  // Cria um novo usuário
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      let { role } = req.body;
      if (role) role = role.trim().toUpperCase();

      // Busca usuário existente
      const userExists = await userService.findUserByEmail(email);
      if (userExists) {
        return error(res, "E-mail já cadastrado.", undefined, 409);
      }
      // Hash da senha
      const hashedPassword = await userService.hashPassword(password);
      // Criação do usuário
      const user = await userService.createUser({
        name,
        email,
        password: hashedPassword,
        role,
      });
      return success(res, "Usuário criado com sucesso.", user, 201);
    } catch (error: any) {
      return error(res, "Erro ao cadastrar usuário.", undefined, 500);
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
