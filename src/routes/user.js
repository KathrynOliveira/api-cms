const express = require("express");
const router = express.Router();

const userValidation = require("../middlewares/validations/userValidation");
const UserController = require("../controllers/UserController");

router.post("/users", userValidation, UserController.createUser);

module.exports = router;
