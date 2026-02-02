import { body } from "express-validator";
import { ValidationChain } from "express-validator";

const categoryValidation: ValidationChain[] = [
  body("title")
    .notEmpty()
    .withMessage("O título é obrigatório.")
    .bail()
    .isLength({ min: 3 })
    .withMessage("O título deve ter no mínimo 3 caracteres."),
  body("slug")
    .notEmpty()
    .withMessage("O slug é obrigatório.")
    .isSlug()
    .withMessage("O slug deve ser válido (ex: texto-sem-espacos)."),
];

export default categoryValidation;
