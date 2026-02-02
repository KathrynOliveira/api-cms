import { Request, Response } from "express";
import * as articleService from "../services/articleService";
import { success, error } from "../utils/response";

const articleController = {
  // Cria um novo artigo
  async createArticle(req: Request, res: Response) {
    try {
      const article = await articleService.createArticle(req.body);
      return success(res, "Artigo criado com sucesso.", article, 201);
    } catch (err: any) {
      return error(res, err.message, err.details, err.status || 500);
    }
  },

  // Edita um artigo existente
  async editArticle(req: Request, res: Response) {
    try {
      // @ts-ignore
      const currentUser = req.user;
      const article = await articleService.editArticle(
        String(req.params.id),
        req.body,
        currentUser,
      );
      return success(res, "Artigo editado com sucesso.", article);
    } catch (err: any) {
      return error(res, err.message, err.details, err.status || 500);
    }
  },

  // Remove um artigo
  async removeArticle(req: Request, res: Response) {
    try {
      const existingArticle = await articleService.findArticleById(
        String(req.params.id),
      );
      if (!existingArticle) {
        return error(res, "Artigo não encontrado.", undefined, 404);
      }
      await articleService.removeArticle(String(req.params.id));
      return success(res, "Artigo removido com sucesso.");
    } catch (err: any) {
      return error(res, "Erro ao remover artigo.", err.message);
    }
  },

  //Retorna todas os artigos com paginação
  async getAllArticles(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const articles = await articleService.getAllArticles(page, pageSize);
      return success(res, "Artigos encontrados com sucesso.", articles);
    } catch (err: any) {
      return error(res, "Erro ao buscar artigos.", err.message);
    }
  },

  // Retorna artigos por categoria
  async getArticlesByCategory(req: Request, res: Response) {
    try {
      const articlesByCategory = await articleService.getArticlesByCategory(
        String(req.params.categoryId),
      );
      return success(
        res,
        "Artigos da categoria encontrados com sucesso.",
        articlesByCategory,
      );
    } catch (err: any) {
      return error(res, err.message, err.details, err.status || 500);
    }
  },
};

export default articleController;
