const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.post("/api/auth/login", AuthController.auth);

module.exports = router;
