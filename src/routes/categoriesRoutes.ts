import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Proteger todas as rotas deste router:
router.use(authMiddleware);
router.post("/api/categories", CategoriesController.createCategory);
router.put("/api/categories/:id", CategoriesController.editCategory);
router.get("/api/categories", CategoriesController.getAllCategories);
router.delete("/api/categories/:id", CategoriesController.removeCategory);

export default router;
