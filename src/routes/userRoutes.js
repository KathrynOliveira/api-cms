const express = require("express");
const router = express.Router();

const userValidation = require("../middlewares/validations/userValidation");
const UserController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");

// Proteger todas as rotas deste router:
router.use(authMiddleware);
router.post("/api/users", userValidation, UserController.createUser);
router.get("/api/users/me", UserController.getMe);

module.exports = router;
