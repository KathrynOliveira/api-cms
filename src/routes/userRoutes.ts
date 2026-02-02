import { Router } from "express";
import userValidation from "../middlewares/validations/userValidation";
import { handleValidation } from "../middlewares/validations/handleValidation";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Proteger todas as rotas deste router:
router.use(authMiddleware);
router.post(
  "/api/users",
  userValidation,
  handleValidation,
  UserController.createUser,
);
router.get("/api/users", UserController.getAllUsers);
router.get("/api/users/me", UserController.getMe);

export default router;
