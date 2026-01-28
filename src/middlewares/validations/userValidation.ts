import { body } from "express-validator";
import { ValidationChain } from "express-validator";

const userValidation: ValidationChain[] = [
  body("name")
    .notEmpty()
    .withMessage("O nome é obrigatório.")
    .isLength({ min: 3 })
    .withMessage("O nome deve ter no mínimo 3 caracteres."),
  body("email")
    .notEmpty()
    .withMessage("O e-mail é obrigatório.")
    .bail()
    .isEmail()
    .withMessage("E-mail inválido."),
  body("password")
    .notEmpty()
    .withMessage("A senha é obrigatória.")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter no mínimo 6 caracteres."),
  body("role").notEmpty().withMessage("O role é obrigatório."),
];

export default userValidation;
