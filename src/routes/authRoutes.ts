import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/api/auth/login", AuthController.auth);

export default router;
