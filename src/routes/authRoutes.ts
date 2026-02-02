import { Router } from "express";
import AuthController from "../controllers/AuthController";
import rateLimit from "express-rate-limit";

const router = Router();

// Limite: 5 tentativas de login por 15 minutos por IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: {
    status: "error",
    message: "Muitas tentativas de login. Tente novamente em alguns minutos.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/api/auth/login", loginLimiter, AuthController.auth);

export default router;
