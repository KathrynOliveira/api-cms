import { Router } from "express";
import ArticleController from "../controllers/ArticleController";
import authMiddleware from "../middlewares/authMiddleware";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import articleValidation from "../middlewares/validations/articleValidation";
import { handleValidation } from "../middlewares/validations/handleValidation";

const router = Router();

router.use(authMiddleware);

router.post(
  "/api/articles",
  articleValidation,
  handleValidation,
  ArticleController.createArticle,
);

router.get("/api/articles", ArticleController.getAllArticles);
router.get(
  "/api/articles/category/:categoryId",
  ArticleController.getArticlesByCategory,
);

router.put("/api/articles/:id", ArticleController.editArticle);

router.delete("/api/articles/:id", ArticleController.removeArticle);

export default router;
