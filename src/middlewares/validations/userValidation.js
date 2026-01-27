const { body } = require("express-validator");

const userValidation = [
  body("name").notEmpty().withMessage("O nome é obrigatório."),
  body("email").isEmail().withMessage("E-mail inválido."),
  body("password").notEmpty().withMessage("A senha é obrigatória."),
  body("role").notEmpty().withMessage("O role é obrigatório."),
];

module.exports = userValidation;
