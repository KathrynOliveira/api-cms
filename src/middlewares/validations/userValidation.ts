import { body } from "express-validator";
import { ValidationChain } from "express-validator";

const userValidation: ValidationChain[] = [
  body("name").notEmpty().withMessage("O nome é obrigatório."),
  body("email").isEmail().withMessage("E-mail inválido."),
  body("password").notEmpty().withMessage("A senha é obrigatória."),
  body("role").notEmpty().withMessage("O role é obrigatório."),
];

export default userValidation;
