const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");

router.post("/api/auth/login", AuthController.auth);

module.exports = router;
