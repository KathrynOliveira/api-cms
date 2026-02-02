import { body } from "express-validator";
import { ValidationChain } from "express-validator";

const authValidation: ValidationChain[] = [
  body("email")
    .notEmpty()
    .withMessage("O e-mail é obrigatório.")
    .bail()
    .isEmail()
    .withMessage("E-mail inválido."),
  body("password").notEmpty().withMessage("A senha é obrigatória."),
];

export default authValidation;
