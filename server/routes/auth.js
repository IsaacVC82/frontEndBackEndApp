const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");

// Ruta para registrar un nuevo usuario
router.post("/register", register);

// Ruta para loguear y obtener el token JWT
router.post("/login", login);

module.exports = router;
