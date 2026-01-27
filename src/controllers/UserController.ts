import { Request, Response } from "express";
import * as userService from "../services/userService";

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
        return res.status(409).json({ error: "E-mail já cadastrado." });
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
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "Erro ao cadastrar usuário.", details: error.message });
    }
  },

  // Retorna os dados do usuário autenticado
  async getMe(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const user = await userService.findUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: "Erro ao buscar dados do usuário.",
        details: error.message,
      });
    }
  },
};
