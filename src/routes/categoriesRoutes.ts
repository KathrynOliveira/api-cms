import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController";
import authMiddleware from "../middlewares/authMiddleware";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const router = Router();

router.use(authMiddleware);

// Apenas administradores podem criar, editar e remover categorias:
router.post(
  "/api/categories",
  isAdminMiddleware,
  CategoriesController.createCategory,
);
router.put(
  "/api/categories/:id",
  isAdminMiddleware,
  CategoriesController.editCategory,
);
router.delete(
  "/api/categories/:id",
  isAdminMiddleware,
  CategoriesController.removeCategory,
);

// Qualquer usuário autenticado pode listar categorias:
router.get("/api/categories", CategoriesController.getAllCategories);

export default router;
