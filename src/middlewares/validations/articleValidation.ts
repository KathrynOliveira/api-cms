import { body } from "express-validator";
import { ValidationChain } from "express-validator";

const articleValidation: ValidationChain[] = [
  body("title")
    .notEmpty()
    .withMessage("O título é obrigatório.")
    .bail()
    .isLength({ min: 3 })
    .withMessage("O título deve ter no mínimo 3 caracteres."),
  body("body")
    .notEmpty()
    .withMessage("O conteúdo é obrigatório.")
    .isLength({ min: 25 })
    .withMessage("O conteúdo deve ter no mínimo 25 caracteres."),
  body("categoryId")
    .notEmpty()
    .withMessage("A categoria é obrigatória.")
    .isUUID()
    .withMessage("O ID da categoria deve ser um UUID válido."),
  body("userId")
    .notEmpty()
    .withMessage("O usuário é obrigatório.")
    .isUUID()
    .withMessage("O ID do usuário deve ser um UUID válido."),
];

export default articleValidation;
