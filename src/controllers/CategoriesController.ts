import { Request, Response } from "express";
import * as categoryService from "../services/categoriesService";
import { success, error } from "../utils/response";

const categoryController = {
  // Cria uma nova categoria
  async createCategory(req: Request, res: Response) {
    try {
      const category = await categoryService.createCategory(req.body);
      return success(res, "Categoria criada com sucesso.", category, 201);
    } catch (err: any) {
      return error(res, err.message, err.details, err.status || 500);
    }
  },

  // Edita uma categoria existente
  async editCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await categoryService.editCategory(String(id), req.body);
      return success(res, "Categoria editada com sucesso.", category);
    } catch (err: any) {
      return error(res, "Erro ao editar categoria.", err.message);
    }
  },

  // Remove uma categoria
  async removeCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const existingCategory = await categoryService.findCategoryById(
        String(id),
      );
      if (!existingCategory) {
        return error(res, "Categoria não encontrada.", undefined, 404);
      }
      await categoryService.removeCategory(String(id));
      return success(res, "Categoria removida com sucesso.");
    } catch (err: any) {
      return error(res, "Erro ao remover categoria.", err.message);
    }
  },

  // Retorna todas as categorias com paginação
  async getAllCategories(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const categories = await categoryService.getAllCategories(page, pageSize);
      return success(res, "Categorias encontradas com sucesso.", categories);
    } catch (err: any) {
      return error(res, "Erro ao buscar categorias.", err.message);
    }
  },
};

export default categoryController;
